import { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ActionDropDown = (props: any) => {
  const { data } = props;

  const [selectedValue, setSelectedValue] = useState(null);

  const handleStatusClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <Box>
      <Button onClick={handleStatusClick} sx={{ color: '#6B7280' }}>
        {data?.getValue()}
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {data?.row?.original?.Availability ? (
          <MenuItem onClick={handleClose}>Make Offline</MenuItem>
        ) : (
          <>
            <MenuItem onClick={handleClose}>Assign Call to an agent</MenuItem>
            <MenuItem onClick={handleClose}>Take the call</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};
