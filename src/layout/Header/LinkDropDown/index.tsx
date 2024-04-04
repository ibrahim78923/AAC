import React from 'react';
import Image from 'next/image';
import { Box, Popover, useTheme } from '@mui/material';
import { LinkImage } from '@/assets/images';
import { styles } from './LinkDropdown.style';
import useLinkDropDown from './useLinkDropDown';
import QuickLinks from './QuickLinks';
import EditLinks from './EditLinks';

const LinkDropdown = () => {
  const {
    anchorEl,
    open,
    handleClick,
    handleClose,
    toggleView,
    handleToggleView,
  } = useLinkDropDown();

  const theme = useTheme();

  return (
    <div>
      <Box sx={styles?.quickLinkButtonStyle(open, theme)} onClick={handleClick}>
        <Image src={LinkImage} alt="link" />
      </Box>

      <Popover
        id={'10'}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          marginTop: '20px',
        }}
      >
        {!toggleView ? (
          <QuickLinks toggleView={handleToggleView} />
        ) : (
          <EditLinks toggleView={handleToggleView} />
        )}
      </Popover>
    </div>
  );
};

export default LinkDropdown;
