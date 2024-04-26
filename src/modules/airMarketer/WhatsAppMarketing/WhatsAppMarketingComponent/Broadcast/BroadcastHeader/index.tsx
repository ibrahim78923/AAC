import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import Search from '@/components/Search';
import useBroadcast from '../useBroadcast';
import { BroadcastHeaderI } from './BroadcastHeader.interface';
import { styles } from './BroadcastHeader.style';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { useRouter } from 'next/navigation';
import { AIR_MARKETER } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';

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
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <SwitchableDatepicker
            renderInput="date"
            dateValue={dateValue}
            setDateValue={setDateValue}
          />
        </PermissionsGuard>
      </Box>
      <Stack direction="row" spacing={'8px'} sx={styles?.headerRight}>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <Search size="small" placeholder="Search Here" />
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
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
        </PermissionsGuard>

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
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.EDIT_BROADCAST,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleActionsMenuClose();
                  router.push(
                    AIR_MARKETER?.WHATSAPP_MERKETING_UPDATE_BROADCAST,
                  );
                }}
              >
                Edit
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.DELETE_BROADCAST,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleOpenDelete();
                  handleActionsMenuClose();
                }}
              >
                Delete
              </MenuItem>
            </PermissionsGuard>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
};

export default BroadcastHeader;
