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
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SMS_MARKETING_PERMISSIONS } from '@/constants/permission-keys';

const SMSBroadcastHeader = (props: any) => {
  const {
    filterValues,
    setFilterValues,
    checkedRows,
    resetFilters,
    setCheckedRows,
    datePickerVal,
    setDatePickerVal,
    startedDate,
    endedDate,
  } = props;
  const {
    deleteSmsBroadcast,
    handleClick,
    handleClose,
    selectedValue,
    isDelete,
    setIsDelete,
    handleDelete,
    handleEdit,
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
                  toDate: datePickerVal[startedDate],
                  fromDate: datePickerVal[endedDate],
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
              defaultValue={'status'}
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
              <MenuItem value={'Processing'}>Processing</MenuItem>
              <MenuItem value={'Stopped'}>Stopped</MenuItem>
            </Select>
          </FormControl>
        </PermissionsGuard>

        {checkedRows?.length > 1 ? (
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteSmsBroadcast({ ids: checkedRows });
              setCheckedRows([]);
              enqueueSnackbar(`Broadcast Deleted Successfully`, {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              });
            }}
          >
            Delete
          </Button>
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
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
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
            setIsDelete(false);
            deleteSmsBroadcast({ ids: checkedRows });
            setCheckedRows([]);
            enqueueSnackbar(`Broadcast Deleted Successfully`, {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            });
          }}
          handleSubmit={() => {
            deleteSmsBroadcast({ ids: checkedRows });
            setIsDelete(false);
          }}
        />
      )}
    </Grid>
  );
};

export default SMSBroadcastHeader;
