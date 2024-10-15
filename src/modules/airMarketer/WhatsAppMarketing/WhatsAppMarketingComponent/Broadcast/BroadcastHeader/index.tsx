import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import Search from '@/components/Search';
import useBroadcast from '../useBroadcast';
import { styles } from './BroadcastHeader.style';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { AIR_MARKETER } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import {
  AlertModalDeleteIcon,
  DeleteIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { AlertModals } from '@/components/AlertModals';
import {
  AGENT_REQUEST_STATUS,
  AIR_CUSTOMER_PORTAL_TICKET,
  MEETINGS_DETAILS_TYPE,
} from '@/constants/strings';
import { indexNumbers } from '@/constants';

const BroadcastHeader = (props: any) => {
  const {
    setDatePickerVal,
    setFilterValues,
    datePickerVal,
    recordStatus,
    resetFilters,
    filterValues,
    startedDate,
    checkedRows,
    endedDate,
  } = props;
  const {
    theme,
    actionsEl,
    actionsMenuOpen,
    openModalDelete,
    handleOpenDelete,
    handleCloseDelete,
    handleActionsMenuClick,
    deleteBroadcastLoading,
    handleActionsMenuClose,
    handleSMSBroadcastDelete,
    navigate,
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
            renderInput={'date'}
            dateValue={datePickerVal}
            setDateValue={setDatePickerVal}
            handleDateSubmit={() => {
              setFilterValues({
                ...filterValues,
                fromDate: datePickerVal[startedDate],
                toDate: datePickerVal[endedDate],
              });
            }}
          />
        </PermissionsGuard>
      </Box>
      <Stack direction={'row'} gap={1} sx={styles?.headerRight}>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <Search
            size="small"
            placeholder="Search Here"
            onChange={(e: any) => {
              setFilterValues({ ...filterValues, search: e?.target?.value });
            }}
          />
        </PermissionsGuard>
        <Tooltip title={'Refresh Filter'}>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={resetFilters}
          >
            <RefreshTasksIcon />
          </Button>
        </Tooltip>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <FormControl size="small">
            <Select
              sx={{ height: '36px' }}
              value={filterValues?.status}
              onChange={(e: any) => {
                setFilterValues({ ...filterValues, status: e?.target?.value });
              }}
            >
              <MenuItem value={'status'} disabled>
                Status
              </MenuItem>
              <MenuItem value={'Completed'}>Completed</MenuItem>
              <MenuItem value={'Scheduled'}>Scheduled</MenuItem>
              <MenuItem value={'Draft'}>Draft</MenuItem>
              <MenuItem value={'Failed'}>Failed</MenuItem>
            </Select>
          </FormControl>
        </PermissionsGuard>

        {checkedRows?.length > indexNumbers?.ONE ? (
          <LoadingButton
            variant="outlined"
            onClick={() => {
              handleSMSBroadcastDelete(checkedRows);
            }}
            className="small"
            color="inherit"
            startIcon={<DeleteIcon />}
            loading={deleteBroadcastLoading}
          >
            Delete
          </LoadingButton>
        ) : (
          <Box>
            <Button
              className="small"
              onClick={handleActionsMenuClick}
              disabled={
                checkedRows?.length === indexNumbers?.ZERO ? true : false
              }
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
              sx={{
                '.MuiPopover-paper': {
                  minWidth: '115px',
                },
              }}
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
            >
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.EDIT_BROADCAST,
                ]}
              >
                <MenuItem
                  disabled={
                    recordStatus ===
                      MEETINGS_DETAILS_TYPE?.COMPLETED_MEETINGS ||
                    recordStatus === AIR_CUSTOMER_PORTAL_TICKET?.PROCESSING ||
                    recordStatus === AGENT_REQUEST_STATUS?.REJECTED
                      ? true
                      : false
                  }
                  onClick={() => {
                    navigate?.push({
                      pathname:
                        AIR_MARKETER?.WHATSAPP_MERKETING_CREATE_BROADCAST,
                      query: { type: 'edit', id: checkedRows },
                    });
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
        )}
      </Stack>

      {openModalDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={openModalDelete}
          handleClose={handleCloseDelete}
          handleSubmitBtn={() => {
            handleSMSBroadcastDelete(checkedRows);
          }}
          loading={deleteBroadcastLoading}
        />
      )}
    </Box>
  );
};

export default BroadcastHeader;
