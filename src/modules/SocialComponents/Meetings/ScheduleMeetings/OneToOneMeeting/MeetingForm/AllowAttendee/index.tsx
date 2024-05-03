import { Box, Button, Dialog, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFAutocomplete, RHFCheckbox } from '@/components/ReactHookForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useAllowAttendee } from './useAllowAttendee';

export const AllowAttendee = (props: any) => {
  const {
    openCalender,
    handleOpen,
    handleClose,
    handleSave,
    selectedEvents,
    handleEvents,
    timeSlotDuration,
    handleAllowDuration,
  } = useAllowAttendee(props);
  return (
    <>
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
      <Dialog open={openCalender} onClose={handleClose} fullWidth>
        <Box
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
            getOptionLabel={(option: any) => option?.label}
            options={[
              { label: '15 Minutes', value: 15 },
              { label: '30 Minutes', value: 30 },
              { label: '45 Minutes', value: 45 },
              { label: '1 Hour', value: 60 },
            ]}
          />
          <br />
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView={'timeGridDay'}
            allDaySlot={false}
            headerToolbar={false}
            selectable
            select={handleEvents}
            slotDuration={{
              minutes: timeSlotDuration?.value ? timeSlotDuration?.value : 30,
            }}
            selectAllow={handleAllowDuration}
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit',
              hour12: false,
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
            }}
            events={selectedEvents?.map((event: any) => ({
              start: event?.startStr,
              end: event?.endStr,
            }))}
          />
          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
