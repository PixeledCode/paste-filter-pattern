import {
  Pagination,
  PaginationItems,
  PaginationArrow,
  PaginationLabel,
} from "@twilio-paste/core/pagination";
import React from "react";
import type { TableDataRow } from "./filter/types";

export const DefaultPagination = ({
  filteredTableData,
  setPaginatedData,
  setPaginatedPage,
  paginatedPage,
}: {
  filteredTableData: TableDataRow[];
  setPaginatedData: React.Dispatch<React.SetStateAction<TableDataRow[]>>;
  setPaginatedPage: React.Dispatch<React.SetStateAction<number>>;
  paginatedPage: number;
}) => {
  const itemsPerPage = 5;
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    updateTableData(paginatedPage);
  }, [filteredTableData]);
  console.log(paginatedPage, totalPages);

  return (
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
  );
};
