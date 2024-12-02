import CommonDrawer from '@/components/CommonDrawer';
import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FolderBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { useTheme } from '@emotion/react';

const Actions = () => {
  const theme: any = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isMoveToFolderDrawerOpen, setIsMoveToFolderDrawerOpen] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className="small"
        id="basic-button"
        // disabled={selectedRecords?.length < 1}
        sx={{
          width: { xs: '100%', sm: 'auto', md: 'auto', lg: '112px' },
        }}
      >
        Actions
        <ArrowDropDown />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setIsMoveToFolderDrawerOpen(true);
          }}
        >
          Move to a folder
        </MenuItem>
        <MenuItem onClick={handleClose}>Deal Associations</MenuItem>
        <MenuItem onClick={handleClose}>Add to shared folder</MenuItem>
      </Menu>

      <CommonDrawer
        footer
        isDrawerOpen={isMoveToFolderDrawerOpen}
        onClose={() => setIsMoveToFolderDrawerOpen(false)}
        title="Move to folder"
        okText="Apply"
        cancelText="cancel"
        isOk
      >
        <>
          <Search
            searchBy={searchValue}
            setSearchBy={setSearchValue}
            label="Search By Name"
            fullWidth
            size="small"
            sx={{
              marginBottom: '15px',
              '& input': {
                padding: '10px',
                '&::placeholder': {
                  fontSize: '14px',
                },
              },
            }}
          />
          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            Main Folder
          </Typography>
          <Box>
            <MenuItem sx={{ gap: '10px' }}>
              <FolderBlackIcon
                color={theme?.palette?.primary?.main}
                size={22}
              />
              <Typography variant="body1">SubFolder 1</Typography>
            </MenuItem>
            <MenuItem sx={{ gap: '10px' }}>
              <FolderBlackIcon
                color={theme?.palette?.primary?.main}
                size={22}
              />
              <Typography variant="body1">SubFolder 2</Typography>
            </MenuItem>
          </Box>
        </>
      </CommonDrawer>
    </>
  );
};

export default Actions;
