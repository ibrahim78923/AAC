import { v4 as uuidv4 } from 'uuid';
import { Typography, Button, Menu, MenuItem } from '@mui/material';
import { ExportIcon } from '@/assets/icons';
import { useExportButton } from './useExportButton';

export const ExportButton = (props: any) => {
  const { handleCsvExport, handleExcelExport } = props;
  const { anchorEl, open, theme, handleClick, handleClose } = useExportButton();

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
        <MenuItem
          key={uuidv4()}
          onClick={() => {
            handleCsvExport?.();
            handleClose?.();
          }}
        >
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
          onClick={() => {
            handleExcelExport?.();
            handleClose?.();
          }}
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
