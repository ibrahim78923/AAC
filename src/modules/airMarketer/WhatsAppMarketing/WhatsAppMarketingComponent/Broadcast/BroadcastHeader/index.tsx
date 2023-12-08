import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import Search from '@/components/Search';
import useBroadcast from '../useBroadcast';
import { BroadcastHeaderI } from './BroadcastHeader.interface';
import { styles } from './BroadcastHeader.style';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { useRouter } from 'next/navigation';

const BroadcastHeader = (props: BroadcastHeaderI) => {
  const router = useRouter();
  const [dateValue, setDateValue] = useState<any>([new Date(), new Date()]);
  const { handleOpenDelete } = props;
  const {
    theme,
    statusEl,
    statusMenuOpen,
    handleStatusMenuClick,
    handleStatusMenuClose,
    actionsEl,
    actionsMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
  } = useBroadcast();

  return (
    <Box sx={styles?.cont}>
      <Box sx={styles?.headerLeft}>
        <SwitchableDatepicker
          renderInput="date"
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
      </Box>
      <Stack direction="row" spacing={'8px'} sx={styles?.headerRight}>
        <Search size="small" placeholder="Search Here" />
        <Box>
          <Button
            className="small"
            onClick={handleStatusMenuClick}
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: theme?.palette?.custom?.dark,
              color: theme?.palette?.custom?.main,
            }}
          >
            Status
            <ArrowDropDown />
          </Button>
          <Menu
            anchorEl={statusEl}
            open={statusMenuOpen}
            onClose={handleStatusMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiList-root': {
                minWidth: '190px',
              },
            }}
          >
            <MenuItem value={'completed'}>Completed</MenuItem>
            <MenuItem value={'scheduled'}>Scheduled</MenuItem>
            <MenuItem value={'stopped'}>Stopped</MenuItem>
            <MenuItem value={'processing'}>Processing</MenuItem>
            <MenuItem value={'draft'}>Draft</MenuItem>
          </Menu>
        </Box>
        <Box>
          <Button
            className="small"
            onClick={handleActionsMenuClick}
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: theme?.palette?.custom?.dark,
              color: theme?.palette?.custom?.main,
            }}
          >
            Actions
            <ArrowDropDown />
          </Button>

          <Menu
            anchorEl={actionsEl}
            open={actionsMenuOpen}
            onClose={handleActionsMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiList-root': {
                minWidth: '190px',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleActionsMenuClose();
                router.push(
                  '/air-marketer/whatsapp-marketing/update-broadcast',
                );
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleOpenDelete();
                handleActionsMenuClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
};

export default BroadcastHeader;
