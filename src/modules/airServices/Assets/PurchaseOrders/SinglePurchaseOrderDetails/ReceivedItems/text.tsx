import { TextField } from '@mui/material';
import React from 'react';
import { useReceivedItems } from './useReceivedItems';

const Text = (props, { value }: any) => {
  const { receivedAmounts, setReceivedAmounts } = useReceivedItems(props);
  const handleInputChange = (event: any, rowId: any) => {
    setReceivedAmounts((prevAmounts: any) => ({
      ...prevAmounts,
      [rowId]: event.target.value,
    }));
  };

  return (
    <div>
      <TextField
        variant="outlined"
        onChange={(e) => handleInputChange(e, value)}
        value={receivedAmounts[value]}
        type="number"
        size="small"
        fullWidth
      />
    </div>
  );
};

export default Text;
