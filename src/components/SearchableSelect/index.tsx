import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';

const SearchableSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'searchable-select' : undefined;

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        aria-describedby={id}
        placeholder="Select"
        onClick={handleClick}
        sx={{
          width: '100%',
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .css-60ssnn-MuiPaper-root-MuiPopover-paper': {
            width: { lg: '440px', md: '400px', sm: '100%', xs: '100%' },
          },
        }}
      >
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          placeholder="Select"
          sx={{
            width: { lg: '440px', md: '440px', sm: '100%', xs: '100%' },
          }}
        />
        <MenuItem value={10}>test</MenuItem>
        <MenuItem value={10}>test</MenuItem>
        <MenuItem value={10}>test</MenuItem>
      </Popover>
    </Box>
  );
};

export default SearchableSelect;
