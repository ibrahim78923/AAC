import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFAutocomplete, RHFCheckbox } from '@/components/ReactHookForm';
import { useAllowAttendee } from './useAllowAttendee';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const AllowAttendee = (props: any) => {
  const {
    openCalender,
    watchFrom,
    watchTo,
    handleOpen,
    handleClose,
    handleSave,
  } = useAllowAttendee(props);
  return (
    <>
      <Grid item xs={12}>
        <RHFCheckbox
          name="allowAttendee"
          label={
            <Typography variant="body1" color="primary.main">
              Allow Attendee To Set Meeting Time
            </Typography>
          }
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          onClick={handleOpen}
        />
      </Grid>
      <Dialog open={openCalender} onClose={handleClose} fullWidth>
        <Grid
          item
          p={2}
          sx={{
            '.fc-timegrid-event-short .fc-event-time::after': {
              content: 'none',
            },
          }}
        >
          <PageTitledHeader
            title="Select Date & Time"
            canMovedBack
            moveBack={handleClose}
          />
          <RHFAutocomplete
            name="timeSlotDuration"
            label="Time Slot Duration"
            size="small"
            placeholder="Select Duration"
            options={['30 Minutes']}
          />
          <br />
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView={'timeGridDay'}
            allDaySlot={false}
            headerToolbar={false}
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit',
              hour12: false,
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
            }}
            events={[
              {
                start: watchFrom,
                end: watchTo,
              },
            ]}
          />
          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Grid>
      </Dialog>
    </>
  );
};
