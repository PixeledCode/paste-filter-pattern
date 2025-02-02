/* DISCLAIMER: this is an example, not meant to be used in production */

import { Badge } from "@twilio-paste/core/badge";
import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { ButtonGroup } from "@twilio-paste/core/button-group";
import { DetailText } from "@twilio-paste/core/detail-text";
import {
  FormPillGroup,
  useFormPillState,
} from "@twilio-paste/core/form-pill-group";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { ExportIcon } from "@twilio-paste/icons/cjs/ExportIcon";
import { MoreIcon } from "@twilio-paste/icons/cjs/MoreIcon";
import * as React from "react";

import { applyFilters, isValueEmpty, slugify } from "./helpers";
import type {
  ExtendedTableDataRow,
  FilterListType,
  FilterMapType,
  FilterProps,
  selectedFilterProps,
} from "./types";
import { EmptyState } from "./EmptyState";
import { ExtendedDataGrid } from "./ExtendedDataGrid";
import { FilterPill } from "./FilterPill";
import { SampleDataGrid } from "./SampleDataGrid";
import { AddFilters } from "./filters/AddFilters";
import { CustomFilter } from "./filters/CustomFilter";
import { DateRangeFilter } from "./filters/DateRangeFilter";
import { DepartmentFilter } from "./filters/DepartmentFilter";
import { ParticipantsFilter } from "./filters/ParticipantsFilter";
import { PlatformFilter } from "./filters/PlatformFilter";
import { RoomSidFilter } from "./filters/RoomSidFilter";
import { RoomTypeFilter } from "./filters/RoomTypeFilter";
import { SearchFilter } from "./filters/SearchFilter";
import { UniqueNameFilter } from "./filters/UniqueNameFilter";
import {
  Pagination,
  PaginationItems,
  PaginationArrow,
  PaginationLabel,
} from "@twilio-paste/core/pagination";

function countMoreFilters(
  selectedMoreFilters: Record<string, string | string[]>
): number {
  let count = 0;
  for (const key in selectedMoreFilters) {
    if (Array.isArray(selectedMoreFilters[key])) {
      if (selectedMoreFilters[key].length > 0) count += 1;
    } else {
      count += 1;
    }
  }

  return count;
}

const itemsPerPage = 10;
// Note: update the codesandboxes if update this
export const DefaultFilter: React.FC<React.PropsWithChildren<FilterProps>> = ({
  data,
  withSearch,
  filterList,
  addFiltersList,
  recommendedFiltersList,
  onMoreFiltersClick,
  extendedTable,
  selectedMoreFilters,
  setSelectedMoreFilters,
  selectedFiltersDefault,
}) => {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, selectedFilterProps>
  >(selectedFiltersDefault || {});
  const [addedFilters, setAddedFilters] = React.useState<FilterListType>([]);
  const pillState = useFormPillState();

  const [paginatedData, setPaginatedData] = React.useState(data);
  const [paginatedPage, setPaginatedPage] = React.useState(1);
  const [filteredTableData, setFilteredTableData] = React.useState(data);

  const handleApplyFilters = (filters: selectedFilterProps): void => {
    const filteredData = applyFilters(filters, data as ExtendedTableDataRow[]);
    setPaginatedPage(1);
    setFilteredTableData(filteredData);
    setPaginatedData(filteredData.slice(0, itemsPerPage));
  };

  function handleClearAll(): void {
    setSelectedFilters({});
    setSelectedMoreFilters?.({});
    setFilteredTableData(data);
    setPaginatedPage(1);
    setPaginatedData(data.slice(0, itemsPerPage));
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    updateTableData(1);
  }, [data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (selectedMoreFilters) {
      setSelectedFilters((e) => {
        return {
          ...e,
          ...(selectedMoreFilters as Record<string, selectedFilterProps>),
        };
      });
      handleApplyFilters({
        ...selectedFilters,
        ...selectedMoreFilters,
      } as selectedFilterProps);
    }

    // for EmptyState example
    if (selectedFiltersDefault) {
      handleApplyFilters(selectedFiltersDefault as selectedFilterProps);
    }
  }, [selectedMoreFilters, selectedFiltersDefault]);

  const filterMap: FilterMapType = {
    roomType: {
      label: "Room type",
      component: RoomTypeFilter,
    },
    participants: {
      label: "Participants",
      component: ParticipantsFilter,
    },
    dateCompleted: {
      label: "Date range",
      component: DateRangeFilter,
    },
    custom: {
      label: "Date range",
      component: CustomFilter,
    },
    roomSid: {
      label: "Room SID",
      component: RoomSidFilter,
    },
    uniqueName: {
      label: "Unique Name",
      component: UniqueNameFilter,
    },
    department: {
      label: "Department",
      component: DepartmentFilter,
    },
    platform: {
      label: "Platform",
      component: PlatformFilter,
    },
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const newFilters = { ...selectedFilters };
    for (const key in selectedFilters) {
      const typedKey = key as FilterListType[0];
      if (
        !addedFilters.includes(typedKey) &&
        addFiltersList?.includes(typedKey)
      ) {
        delete newFilters[key];
      }
    }

    setSelectedFilters(newFilters);
    handleApplyFilters(newFilters as selectedFilterProps);
  }, [addedFilters, addFiltersList]);

  function removeFilter(filter: string): void {
    const newFilters = { ...selectedFilters };
    const { [filter]: _, ...rest } = newFilters;

    setSelectedFilters(rest);
    handleApplyFilters(rest as selectedFilterProps);
  }

  function addFilter(type: string, value: selectedFilterProps): void {
    const newFilters = { ...selectedFilters, [type]: value };
    setSelectedFilters(newFilters);
    handleApplyFilters(newFilters as selectedFilterProps);
  }

  // Pagination
  const totalPages = Math.ceil(filteredTableData.length / itemsPerPage);

  const goToNextPage = (event: { preventDefault: () => void }) => {
    setPaginatedPage((page) => {
      const nextPage = Math.min(page + 1, totalPages);
      updateTableData(nextPage);
      return nextPage;
    });
    event.preventDefault();
  };

  const goToPreviousPage = (event: { preventDefault: () => void }) => {
    setPaginatedPage((page) => {
      const prevPage = Math.max(page - 1, 1);
      updateTableData(prevPage);
      return prevPage;
    });
    event.preventDefault();
  };

  const updateTableData = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newTableData = filteredTableData.slice(startIndex, endIndex);
    setPaginatedData(newTableData);
  };

  return (
    <Box padding="space50">
      {withSearch ? (
        <Box marginBottom="space50" maxWidth="size30">
          <SearchFilter
            onChange={(e) => {
              const newFilters = { ...selectedFilters, search: e.target.value };

              if (newFilters.search === "") {
                const { search: _, ...rest } = newFilters;

                setSelectedFilters(rest as Record<string, selectedFilterProps>);
                handleApplyFilters(rest as selectedFilterProps);
                return;
              }

              setSelectedFilters(
                newFilters as Record<string, selectedFilterProps>
              );
              handleApplyFilters(newFilters as selectedFilterProps);
            }}
            value={(selectedFilters.search as string) || ""}
          />
        </Box>
      ) : null}

      <Heading as="h1" variant="heading50">
        Filter
      </Heading>

      <FormPillGroup
        {...pillState}
        aria-label="Filters:"
        size="large"
        variant="tree"
      >
        {filterList.map((pill) => {
          return (
            <FilterPill
              key={pill}
              pill={pill}
              selectedFilters={selectedFilters}
              filterMap={filterMap}
              pillState={pillState}
              onDismiss={() => {
                removeFilter(pill);
              }}
              onApply={(type: string, value) => {
                if (isValueEmpty(type, value)) {
                  removeFilter(type);
                  return;
                }
                addFilter(type, value);
              }}
            />
          );
        })}

        {addedFilters.length > 0
          ? addedFilters.map((pill: string) => {
              return (
                <FilterPill
                  key={pill}
                  pill={pill}
                  selectedFilters={selectedFilters}
                  filterMap={filterMap}
                  pillState={pillState}
                  onDismiss={() => {
                    removeFilter(pill);
                  }}
                  onApply={(type: string, value) => {
                    if (
                      !value ||
                      (Array.isArray(value) && value.length === 0)
                    ) {
                      removeFilter(type);
                      return;
                    }
                    addFilter(type, value);
                  }}
                  onRemove={() => {
                    const newFilters = addedFilters.filter(
                      (item) => item !== pill
                    );
                    setAddedFilters(newFilters);

                    removeFilter(pill);
                  }}
                />
              );
            })
          : null}

        {addFiltersList && addFiltersList.length > 0 ? (
          <AddFilters
            onApply={(_: string, addFilterSelectedList) => {
              const sluggedList = (addFilterSelectedList as FilterListType).map(
                (item) => slugify(item)
              );
              setAddedFilters(sluggedList as FilterListType);
            }}
            addFiltersList={addFiltersList}
            filterMap={filterMap}
            recommendedFiltersList={recommendedFiltersList}
            value={addedFilters}
          />
        ) : null}

        {onMoreFiltersClick ? (
          <Button
            variant="secondary"
            size="rounded_small"
            onClick={onMoreFiltersClick}
          >
            <Box display="flex" alignItems="center" columnGap="space20">
              More filters
              {selectedMoreFilters &&
              countMoreFilters(selectedMoreFilters) > 0 ? (
                <Badge as="span" variant="neutral_counter" size="small">
                  <Box minWidth="12px">
                    {countMoreFilters(selectedMoreFilters)}
                  </Box>
                </Badge>
              ) : null}
            </Box>
          </Button>
        ) : null}
      </FormPillGroup>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        columnGap="space30"
        rowGap="space30"
        marginTop="space50"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          columnGap="space30"
          rowGap="space30"
        >
          <DetailText marginTop="space0">
            <Text as="span" color="colorTextWeak" fontSize="fontSize30">
              {filteredTableData.length} result
              {filteredTableData.length !== 1 && "s"}
            </Text>
          </DetailText>
          {filteredTableData.length !== data.length ? (
            <Button variant="link" onClick={handleClearAll}>
              Clear all
            </Button>
          ) : null}
        </Box>

        <ButtonGroup>
          <Button variant="secondary" size="small">
            <ExportIcon decorative />
            Export CSV
          </Button>
          <Button variant="secondary" size="icon_small">
            <MoreIcon decorative={false} title="More options" />
          </Button>
        </ButtonGroup>
      </Box>
      <Box marginTop="space60">
        {filteredTableData.length > 0 ? (
          extendedTable ? (
            <ExtendedDataGrid
              data={paginatedData as ExtendedTableDataRow[]}
              showDateTime
            />
          ) : (
            <SampleDataGrid data={paginatedData} showDateTime />
          )
        ) : (
          <EmptyState handleClearAll={handleClearAll} />
        )}
      </Box>

      <Box display="flex" justifyContent="center" marginTop="space60">
        <Pagination label="default pagination navigation">
          <PaginationItems>
            <PaginationArrow
              label="Go to previous page"
              variant="back"
              onClick={goToPreviousPage}
              disabled={paginatedPage === 1}
            />
            <PaginationLabel>Page {paginatedPage}</PaginationLabel>
            <PaginationArrow
              label="Go to next page"
              variant="forward"
              onClick={goToNextPage}
              disabled={paginatedPage === totalPages}
            />
          </PaginationItems>
        </Pagination>
      </Box>
    </Box>
  );
};
