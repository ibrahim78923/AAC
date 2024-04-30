import { Checkbox } from '@mui/material';
import React from 'react';

const RowSelection = ({ id, selectedRow, setSelectedRow, disabled }: any) => {
  const handleClick = () => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow?.slice(0, selectedIndex),
        selectedRow?.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
  };

  const isSelected = selectedRow?.indexOf(id) !== -1;

  return (
    <Checkbox
      color="primary"
      checked={isSelected}
      name={id}
      onClick={handleClick}
      disabled={disabled}
    />
  );
};

export default RowSelection;
