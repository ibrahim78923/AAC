import { DownIcon, PlusSharedColorIcon } from '@/assets/icons';
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
import { styles } from './Meetings.style';
import { AddOutcomeModal } from './AddOutcome';
import { useMeetings } from './useMeetings';

export const Meetings = () => {
  const {
    theme,
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
        <Grid container sx={styles?.headingContainer}>
          <Grid item sm={6} xs={12}>
            <Typography variant="h5" fontWeight={500} color="secondary.main">
              Meetings
            </Typography>
          </Grid>
          <Grid item sx={styles?.buttonsBox} sm={6} xs={12}>
            <Button
              endIcon={<DownIcon />}
              disableElevation
              disabled={!!!meetingsData?.length}
              variant="outlined"
              color="secondary"
              fullWidth={matches}
              onClick={handleActionsClick}
              sx={{
                '& path': {
                  fill: !!!meetingsData?.length
                    ? ''
                    : theme?.palette?.secondary?.main,
                },
              }}
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
                  sx={styles?.popOverStyles}
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
              sx={styles?.addMeetingButton}
              fullWidth={matches}
              startIcon={<PlusSharedColorIcon />}
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
