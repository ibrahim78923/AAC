import { StatusInfoIcon } from '@/assets/icons';
import { Box, Popover } from '@mui/material';
import React from 'react';

const MouseOverPopover = ({ id, description }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '24px', height: '24px' }}>
      <Box
        aria-owns={open ? `mouse-over-popover${id}` : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ width: '24px', height: '24px', cursor: 'pointer' }}
      >
        <StatusInfoIcon />
      </Box>
      <Popover
        id={`mouse-over-popover${id}`}
        sx={{
          pointerEvents: 'none',
          '& .MuiPaper-root': {
            maxWidth: '288px',
            backgroundColor: (theme: any) => theme?.palette?.primary?.lighter,
          },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box sx={{ p: '16px' }}>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: '600',
              lineHeight: '1.5',
              color: 'blue?.main',
            }}
          >
            Available
          </Box>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: 'blue?.main',
              mt: '9px',
            }}
          >
            {description}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default MouseOverPopover;
