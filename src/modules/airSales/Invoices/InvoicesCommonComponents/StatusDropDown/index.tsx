import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem } from '@mui/material';

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
