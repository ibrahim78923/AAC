import {
  Box,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styles } from './liveDashboard.style';
import useLiveDashboard from './useLiveDashboard';
import { DownIcon } from '@/assets/icons';
import { Indicators } from './Indicators';
import { AllIncomingCalls } from './AllIncomingCalls';
import { v4 as uuidv4 } from 'uuid';
import TableSection from './TableSection';

export const LiveDashboard = () => {
  const {
    anchorEl,
    setAnchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    options,
    selectedOptions,
    handleMenuItemClick,
    multiSelect,
    handleCloseMultiSelect,
    handleClickMultiSelect,
  } = useLiveDashboard();

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h4">Live dashboard</Typography>

        <Box>
          <Button
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClickMultiSelect}
            className="small"
            sx={styles?.actionBtn}
          >
            Queue &nbsp; <DownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={multiSelect}
            open={Boolean(multiSelect)}
            onClose={handleCloseMultiSelect}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                width: 'fit-content',
              },
            }}
          >
            {options?.map((option) => (
              <MenuItem
                key={uuidv4()}
                onClick={handleMenuItemClick(option?.value)}
                sx={{ padding: '0 12px' }}
              >
                <Checkbox
                  checked={selectedOptions.indexOf(option?.value) !== -1}
                  color="primary"
                />
                {option?.label}
              </MenuItem>
            ))}
          </Menu>

          <Button
            id="basic-button"
            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpen ? 'true' : undefined}
            onClick={handleActionsClick}
            sx={styles?.actionBtn}
            className="small"
          >
            Actions &nbsp; <DownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={actionMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                width: '112px',
              },
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Today</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>This month</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Indicators />
      <AllIncomingCalls />
      <TableSection />
    </>
  );
};
