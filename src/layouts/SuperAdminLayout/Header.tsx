import React from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const Header = (props: any) => {
  const { handleDrawerToggle } = props;
  return (
    <>
      <Box>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' }, p: 0 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          Responsive Header
        </Box>
      </Box>
    </>
  );
};

export default Header;
