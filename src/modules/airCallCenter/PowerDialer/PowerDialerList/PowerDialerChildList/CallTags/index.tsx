import { Box, Popover, Typography } from '@mui/material';
import { useCallTags } from './useCallTags';

export const CallTags = ({ data }: any) => {
  const { anchorEl, handlePopoverOpen, handlePopoverClose, open } =
    useCallTags();
  return (
    <>
      <Typography
        variant="body3"
        color="primary.main"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {data?.length}+
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box sx={{ px: 1, display: 'flex', flexDirection: 'column' }}>
          {data?.map((tag: any) => (
            <Typography key={tag} variant="body3" color="custom.main" py={0.5}>
              {tag}
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};
