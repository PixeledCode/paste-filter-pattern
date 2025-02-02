/* DISCLAIMER: this is an example, not meant to be used in production */

import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHead,
  DataGridHeader,
  DataGridRow,
} from "@twilio-paste/core/data-grid";
import * as React from "react";

import { TABLE_HEADERS } from "./constants";
import { formatDate, formatDateTime } from "./helpers";
import type { SampleDataGridProps } from "./types";

export const SampleDataGrid: React.FC<
  React.PropsWithChildren<SampleDataGridProps>
> = ({ data, showDateTime = false }) => {
  const [renderDates, setRenderDates] = React.useState(false);
  React.useEffect(() => {
    setRenderDates(true);
  }, []);

  return (
    <DataGrid aria-label="Video rooms" scrollHorizontally noWrap>
      <DataGridHead>
        <DataGridRow>
          {TABLE_HEADERS.map((header) => (
            <DataGridHeader key={header}>{header}</DataGridHeader>
          ))}
        </DataGridRow>
      </DataGridHead>
      <DataGridBody>
        {data.map(
          ({ roomSid, uniqueName, roomType, participants, dateCompleted }) => (
            <DataGridRow key={roomSid}>
              <DataGridCell>{roomSid}</DataGridCell>
              <DataGridCell>{uniqueName}</DataGridCell>
              <DataGridCell>{roomType}</DataGridCell>
              <DataGridCell>{participants}</DataGridCell>
              {renderDates && (
                <DataGridCell>
                  {showDateTime
                    ? formatDateTime(dateCompleted)
                    : formatDate(dateCompleted)}
                </DataGridCell>
              )}
            </DataGridRow>
          )
        )}
      </DataGridBody>
    </DataGrid>
  );
};
