import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

export const SelectUnit = (props: any) => {
  const { data } = props;
  const [selectValue, setSelectValue] = useState(data?.getValue());
  return (
    <FormControl size="small">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectValue}
        onChange={(event: any) => {
          setSelectValue(event?.target?.value);
        }}
        sx={{ width: '100px' }}
      >
        <MenuItem value="gbp">GBP</MenuItem>
        <MenuItem value="%">%</MenuItem>
      </Select>
    </FormControl>
  );
};
