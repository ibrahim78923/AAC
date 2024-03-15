import { PlusSharedColorIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import { AddMeetingsDrawer } from './AddMeetingsDrawer';
import { meetingsTableColumns } from './MeetingsTable/MeetingsTable.data';
import { MeetingsTable } from './MeetingsTable';
import { NoMeetings } from './NoMeetings';
import { widgetsData } from './Meetings.data';
import { styles } from './Meetings.style';
import { AddOutcomeModal } from './AddOutcome';
import { useMeetings } from './useMeetings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Permissions } from '@/constants/permissions';
import { successSnackbar } from '@/utils/api';

export const Meetings = () => {
  const {
    meetingsData,
    onSubmitAddOutcome,
    reschedulePopover,
    addCoversationModel,
    handleReschedulePopoverClose,
    handleRescheduleClick,
    actionsPopover,
    setMeetingsData,
    handleActionsPopoverClose,
    handleActionsClick,
    setDrawerOpen,
    drawerOpen,
    setShowAddOutcome,
    showAddOutcome,
  } = useMeetings();

  return (
    <>
      <div className="meeting">
        <AddMeetingsDrawer open={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <AddOutcomeModal
          show={showAddOutcome}
          setShow={setShowAddOutcome}
          addCoversationModel={addCoversationModel}
          onSubmit={onSubmitAddOutcome}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1}
        >
          <Box>
            <Typography variant="h5" fontWeight={500} color="secondary.main">
              Meetings
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <PermissionsGuard
              permissions={
                Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_MEETINGS_ACTIONS
              }
            >
              <Button
                endIcon={<ArrowDropDownIcon />}
                disableElevation
                disabled={!!meetingsData?.length}
                variant="outlined"
                color="secondary"
                onClick={handleActionsClick}
              >
                Actions
              </Button>
              <Popover
                open={!!actionsPopover}
                anchorEl={actionsPopover}
                onClose={handleActionsPopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={styles?.popOverStyles}
              >
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING,
                  ]}
                >
                  <MenuItem
                    onClick={() => {
                      setDrawerOpen(true);
                      handleActionsPopoverClose();
                    }}
                    sx={{ p: 1 }}
                  >
                    Edit
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_TICKETS_TICKETS_DETAILS?.RESCHEDULED_MEETING,
                  ]}
                >
                  <MenuItem sx={{ p: 0 }}>
                    <a
                      style={{
                        display: 'block',
                        padding: '.5rem',
                        width: '100%',
                      }}
                      onClick={handleRescheduleClick}
                    >
                      Reschedule
                    </a>
                    <Popover
                      open={!!reschedulePopover}
                      anchorEl={reschedulePopover}
                      onClose={handleReschedulePopoverClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      sx={styles?.popOverStyles}
                    >
                      <MenuItem sx={{ p: 1 }}>Later Today</MenuItem>
                      <MenuItem sx={{ p: 1 }}>Tomorrow</MenuItem>
                      <MenuItem sx={{ p: 1 }}>Next week</MenuItem>
                      <MenuItem sx={{ p: 1 }}>Pick a date and time</MenuItem>
                    </Popover>
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING_OUTCOMES,
                  ]}
                >
                  <MenuItem
                    sx={{ p: 1 }}
                    onClick={() => {
                      setShowAddOutcome(true);
                      handleActionsPopoverClose();
                    }}
                  >
                    Add outcome
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_MEETING,
                  ]}
                >
                  <MenuItem
                    sx={{ p: 1 }}
                    onClick={() => {
                      successSnackbar('Meeting Deleted Successfully');
                      handleActionsPopoverClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                </PermissionsGuard>
              </Popover>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_MEETING]}
            >
              <Button
                startIcon={<PlusSharedColorIcon />}
                disableElevation
                onClick={() => setDrawerOpen(true)}
                variant="contained"
              >
                Add Meeting
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <br />
        <Grid mb="20px" container spacing={3}>
          {widgetsData?.map((item) => (
            <Grid item key={item?.id} sm={4} xs={12}>
              <Box sx={styles?.widgetsBox}>
                <Box sx={styles?.coloredWidgetsDiv(item?.color)}></Box>
                <Box sx={styles?.widgetsInnerBox}>
                  <Typography variant="body2">{item?.name}</Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {item?.count}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        {!!meetingsTableColumns?.length ? (
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.MEETING_LIST]}
          >
            <MeetingsTable
              meetingsData={meetingsData}
              setMeetingsData={setMeetingsData}
            />
          </PermissionsGuard>
        ) : (
          <NoMeetings setDrawerOpen={setDrawerOpen} />
        )}
      </div>
    </>
  );
};
export default Meetings;
