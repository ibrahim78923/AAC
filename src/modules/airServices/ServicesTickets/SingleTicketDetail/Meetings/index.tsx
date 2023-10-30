import { DownIcon, PlusSharedIcon } from '@/assets/icons';
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
import { v4 as uuidv4 } from 'uuid';
import { meetingsStyles } from './Meetings.styles';
import { AddOutcomeModal } from './AddOutcome';
import { useMeetings } from './useMeetings';

export const Meetings = () => {
  const {
    enqueueSnackbar,
    meetingsData,
    onSubmitAddOutcome,
    reschedulePopover,
    addCoversationModel,
    handleReschedulePopoverClose,
    handleRescheduleClick,
    actionsPopover,
    matches,
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
        <Grid container sx={meetingsStyles?.headingContainer}>
          <Grid item sm={6} xs={12}>
            <Typography variant="h5" fontWeight={500} color="#374151">
              Meetings
            </Typography>
          </Grid>
          <Grid item sx={meetingsStyles?.buttonsBox} sm={6} xs={12}>
            <Button
              endIcon={<DownIcon />}
              disableElevation
              disabled={!!!meetingsData?.length}
              variant="contained"
              fullWidth={matches}
              onClick={handleActionsClick}
              sx={meetingsStyles?.actionButton}
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
              sx={meetingsStyles?.popOverStyles}
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
              <MenuItem sx={{ p: 0 }}>
                <a
                  style={{ display: 'block', padding: '.5rem', width: '100%' }}
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
                  sx={meetingsStyles?.popOverStyles}
                >
                  <MenuItem sx={{ p: 1 }}>Later Today</MenuItem>
                  <MenuItem sx={{ p: 1 }}>Tomorrow</MenuItem>
                  <MenuItem sx={{ p: 1 }}>Next week</MenuItem>
                  <MenuItem sx={{ p: 1 }}>Pick a date and time</MenuItem>
                </Popover>
              </MenuItem>
              <MenuItem
                sx={{ p: 1 }}
                onClick={() => {
                  setShowAddOutcome(true);
                  handleActionsPopoverClose();
                }}
              >
                Add outcome
              </MenuItem>
              <MenuItem
                sx={{ p: 1 }}
                onClick={() => {
                  enqueueSnackbar('Meeting Deleted Successfully', {
                    variant: 'success',
                  });
                  handleActionsPopoverClose();
                }}
              >
                Delete
              </MenuItem>
            </Popover>
            <Button
              sx={meetingsStyles?.addMeetingButton}
              fullWidth={matches}
              startIcon={<PlusSharedIcon />}
              disableElevation
              onClick={() => setDrawerOpen(true)}
              variant="contained"
            >
              Add Meeting
            </Button>
          </Grid>
        </Grid>
        <Grid mb="20px" container spacing={3}>
          {widgetsData.map((item) => (
            <Grid item key={uuidv4()} sm={4} xs={12}>
              <Box sx={meetingsStyles?.widgetsBox}>
                <Box sx={meetingsStyles?.coloredWidgetsDiv(item?.color)}></Box>
                <Box sx={meetingsStyles?.widgetsInnerBox}>
                  <Typography variant="body2" color="#6B7280">
                    {item?.name}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="#111827">
                    {item?.count}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        {!!meetingsTableColumns?.length ? (
          <MeetingsTable
            meetingsData={meetingsData}
            setMeetingsData={setMeetingsData}
          />
        ) : (
          <NoMeetings setDrawerOpen={setDrawerOpen} />
        )}
      </div>
    </>
  );
};
export default Meetings;
