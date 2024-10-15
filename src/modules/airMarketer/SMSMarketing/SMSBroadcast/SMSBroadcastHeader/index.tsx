import {
  Box,
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import useSMSBroadcast from '../useSMSBroadcast';
import { ArrowDropDown } from '@mui/icons-material';
import {
  AlertModalDeleteIcon,
  DeleteIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SMS_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { LoadingButton } from '@mui/lab';
import { SMSBroadcastHeaderProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';
import {
  AGENT_REQUEST_STATUS,
  AIR_CUSTOMER_PORTAL_TICKET,
  MEETINGS_DETAILS_TYPE,
} from '@/constants/strings';

const SMSBroadcastHeader = (props: SMSBroadcastHeaderProps) => {
  const {
    filterValues,
    setFilterValues,
    checkedRows,
    resetFilters,
    datePickerVal,
    setDatePickerVal,
    startedDate,
    endedDate,
    recordStatus,
  } = props;
  const {
    deleteBroadcastLoading,
    handleSMSBroadcastDelete,
    handleClick,
    handleClose,
    selectedValue,
    isDelete,
    setIsDelete,
    handleDelete,
    navigate,
  } = useSMSBroadcast();

  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: 'space-between', my: 1, alignItems: 'center' }}
    >
      <Grid item xs={12} lg={6}>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <Stack direction="row" gap={1}>
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
          </Stack>
        </PermissionsGuard>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'right',
          alignItems: 'right',
          display: 'flex',
          gap: '10px',
        }}
      >
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
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
            AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.SEARCH_AND_FILTER,
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

        {checkedRows?.length > 1 ? (
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
              color="inherit"
              className="small"
              variant="outlined"
              disabled={checkedRows?.length === 0 ? true : false}
              endIcon={<ArrowDropDown />}
              onClick={handleClick}
            >
              Actions
            </Button>
            <Menu
              sx={{
                '.MuiPopover-paper': {
                  minWidth: '115px',
                },
              }}
              id="simple-menu"
              anchorEl={selectedValue}
              open={Boolean(selectedValue)}
              onClose={handleClose}
            >
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.EDIT_SMS_BROADCAST,
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
                      pathname: AIR_MARKETER?.CREATE_SMS_BROADCAST,
                      query: { type: 'edit', id: checkedRows },
                    });
                  }}
                >
                  Edit
                </MenuItem>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.DELETE_SMS_BROADCAST,
                ]}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </PermissionsGuard>
            </Menu>
          </Box>
        )}
      </Grid>

      {isDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete SMS Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() => setIsDelete(false)}
          handleSubmitBtn={() => {
            handleSMSBroadcastDelete(checkedRows);
          }}
          loading={deleteBroadcastLoading}
        />
      )}
    </Grid>
  );
};

export default SMSBroadcastHeader;
