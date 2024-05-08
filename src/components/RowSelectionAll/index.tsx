import { Checkbox } from '@mui/material';
import React from 'react';

const RowSelectionAll = ({
  rows,
  selectedRow,
  setSelectedRow,
  disabled,
}: any) => {
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((row: any) => row?._id);
      setSelectedRow(newSelected);
      return;
    }
    setSelectedRow([]);
  };

  const isIndeterminate =
    selectedRow?.length > 0 && selectedRow?.length < rows?.length;
  const isChecked = rows?.length > 0 && selectedRow?.length === rows?.length;
  return (
    <Checkbox
      color="primary"
      indeterminate={isIndeterminate}
      checked={isChecked}
      onChange={(event) => handleClick(event)}
      disabled={disabled}
    />
  );
};

export default RowSelectionAll;
