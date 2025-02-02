import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { ButtonGroup } from "@twilio-paste/core/button-group";
import { DeleteIcon } from "@twilio-paste/icons/cjs/DeleteIcon";
import type React from "react";

export const FilterAction: React.FC<{
  onApply: () => void;
  onClear: (() => void) | null;
  onRemove?: () => void;
}> = ({ onApply, onClear, onRemove }) => {
  return (
    <Box
      marginTop="space70"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <ButtonGroup>
        <Button variant="primary" onClick={onApply}>
          Apply
        </Button>
        {onClear ? (
          <Button variant="link" onClick={onClear}>
            Clear all
          </Button>
        ) : (
          <></>
        )}
      </ButtonGroup>
      {onRemove ? (
        <Button variant="link" onClick={onRemove}>
          <DeleteIcon decorative />
          <span>Remove filter</span>
        </Button>
      ) : null}
    </Box>
  );
};
