/* DISCLAIMER: this is an example, not meant to be used in production */

import { add, format, isAfter, isBefore } from "date-fns";
import type { Duration } from "date-fns";

import type {
  DateRangeType,
  DateRanges,
  DateTimeRanges,
  ExtendedTableDataRow,
  ParticipantsType,
  RoomTypes,
  selectedFilterProps,
} from "./types";

export const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");
export const formatDateTime = (date: Date): string =>
  format(date, "HH:mm:ss 'UTC' yyyy-MM-dd");

export const filterBySearchString = (
  uniqueName: string,
  roomSid: string,
  searchValue: string
): boolean => {
  const lowerCaseName = uniqueName.toLocaleLowerCase();
  const lowerCaseSid = roomSid.toLocaleLowerCase();

  return (
    lowerCaseName.includes(searchValue) || lowerCaseSid.includes(searchValue)
  );
};

export const filterByRoomType = (
  roomType: RoomTypes,
  filterValue: RoomTypes
): boolean => {
  return roomType === filterValue;
};

export const dateDifference = (date1: Date, date2: Date): number =>
  Math.round((date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24));

export const filterByDateRange = (
  dateCompleted: Date,
  filterValue: DateRanges
): boolean => {
  const today = new Date();
  const rangeMap: Record<DateRanges, number> = {
    day: 1,
    oneWeek: 7,
    twoWeeks: 14,
    all: Number.POSITIVE_INFINITY,
  };

  return dateDifference(today, dateCompleted) <= rangeMap[filterValue];
};

export const filterByDateTimeRange = (
  dateCompleted: Date,
  filterValue: DateTimeRanges,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): boolean => {
  if (filterValue === "all") return true;
  if (filterValue !== "custom") {
    const rangeMap: Record<"12hours" | "day" | "threeDays", Duration> = {
      "12hours": { hours: -12 },
      day: { days: -1 },
      threeDays: { days: -3 },
    };
    const computedStart = add(new Date(), rangeMap[filterValue]);

    return isAfter(dateCompleted, computedStart);
  }

  const computedCustomStart = new Date(`${startDate}T${startTime}`);
  const computedCustomEnd = new Date(`${endDate}T${endTime}`);

  return (
    isAfter(dateCompleted, computedCustomStart) &&
    isBefore(dateCompleted, computedCustomEnd)
  );
};

export const isEndDateBeforeStartDate = (
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): boolean => {
  const computedStart = new Date(`${startDate}T${startTime}`);
  const computedEnd = new Date(`${endDate}T${endTime}`);

  return isBefore(computedEnd, computedStart);
};

export const isValueEmpty = (
  type: string,
  value: selectedFilterProps
): boolean => {
  if (type === "roomType" || type === "status") {
    return value === "";
  }

  if (["participants", "dateCompleted", "custom"].includes(type)) {
    return Object.values(value)?.includes("");
  }

  if (
    [
      "roomSid",
      "uniqueName",
      "hostName",
      "tags",
      "department",
      "platform",
    ].includes(type)
  ) {
    return (value as string[])?.length === 0;
  }

  return false;
};

export const applyFilters = (
  filters: selectedFilterProps,
  data: ExtendedTableDataRow[]
): ExtendedTableDataRow[] => {
  let filteredData = [...data];

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.entries(filters).forEach(([type, value]) => {
    if (["roomType", "status"].includes(type) && value !== "") {
      filteredData = filteredData.filter(
        (item) => item[type as keyof ExtendedTableDataRow] === value
      );
    }

    if (type === "participants") {
      const { min, max } = value as unknown as ParticipantsType;

      filteredData = filteredData.filter(
        (item) =>
          item.participants >= Number.parseInt(min, 10) &&
          item.participants <= Number.parseInt(max, 10)
      );
    }

    if (type === "dateCompleted" || type === "custom") {
      const { startDate, endDate } = value as unknown as DateRangeType;

      const start = startDate
        ? new Date(`${startDate}T00:00:00`)
        : Number.NEGATIVE_INFINITY;
      const end = endDate
        ? new Date(`${endDate}T23:59:59`)
        : Number.POSITIVE_INFINITY;

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.dateCompleted);

        return itemDate >= start && itemDate <= end;
      });
    }

    if (type === "search") {
      const search = value as string;

      filteredData = filteredData.filter((item) => {
        const { uniqueName, roomType, participants, dateCompleted, roomSid } =
          item;

        return (
          uniqueName.toLowerCase().includes(search.toLowerCase()) ||
          roomType.toLowerCase().includes(search.toLowerCase()) ||
          participants.toString().includes(search) ||
          dateCompleted.toString().includes(search) ||
          roomSid.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (
      [
        "roomSid",
        "uniqueName",
        "hostName",
        "tags",
        "department",
        "platform",
      ].includes(type)
    ) {
      const search = value as unknown as string[];

      if (search.length > 0) {
        filteredData = filteredData.filter((item) => {
          const itemValue = (
            item[type as keyof ExtendedTableDataRow] as string
          ).toLowerCase();

          return search.some(
            (searchValue) => itemValue === searchValue.toLowerCase()
          );
        });
      }
    }
  });

  return filteredData;
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("")
    .replace(/\W+/g, "");
};
