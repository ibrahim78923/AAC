import { v4 as uuidv4 } from 'uuid';
import { Typography, useTheme, Button, Menu, MenuItem } from '@mui/material';
import { ExportIcon } from '@/assets/icons';
import { useState } from 'react';

export const ActivityExportButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<ExportIcon />}
        color="secondary"
        size="medium"
      >
        Export
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem key={uuidv4()} onClick={() => handleClose?.()}>
          <Typography
            variant="body2"
            fontWeight={500}
            color={theme.palette.grey?.[600]}
          >
            CSV
          </Typography>
        </MenuItem>
        <MenuItem
          key={uuidv4()}
          onClick={() => handleClose?.()}
          sx={{
            '&.MuiMenuItem-root': {
              paddingRight: 4,
            },
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            color={theme.palette.grey?.[600]}
          >
            Excel
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
