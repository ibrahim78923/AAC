import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export const StatusDropdown = (props: any) => {
  const { data } = props;

  const [selectedValue, setSelectedValue] = useState(null);

  const handleStatusClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <Box>
      <Button
        onClick={handleStatusClick}
        sx={{
          border: '1px solid #D1D5DB',
          color: '#6B7280',
          borderRadius: '30px',
          padding: '2px 6px',
          height: '22px',
          fontSize: '12px',
        }}
      >
        {data.getValue()}
        <ArrowDropDown />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Paid</MenuItem>
        <MenuItem onClick={handleClose}>Published</MenuItem>
        <MenuItem onClick={handleClose}>Download</MenuItem>
      </Menu>
    </Box>
  );
};

export const QuantityNumber = (props: any) => {
  const { data } = props;
  return (
    <TextField
      type="number"
      inputProps={{
        min: 0,
        max: 100,
        step: 1,
      }}
      value={data.getValue()}
      size="small"
    />
  );
};

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
          setSelectValue(event.target.value);
        }}
        sx={{ width: '100px' }}
      >
        <MenuItem value="gbp">GBP</MenuItem>
        <MenuItem value="%">%</MenuItem>
      </Select>
    </FormControl>
  );
};
