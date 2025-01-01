import { Box, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFAutocomplete, RHFCheckbox } from '@/components/ReactHookForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useAllowAttendee } from './useAllowAttendee';
import { slotDurationOption } from './AllowAttendee.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
          <Typography variant="body1" color="primary.main" component="span">
            Allow Attendee To Set Meeting Time
          </Typography>
        }
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        onClick={handleOpen}
      />
      <CustomCommonDialog
        isPortalOpen={openCalender}
        closePortal={handleClose}
        dialogTitle="Select Date & Time"
        submitButtonText="Save"
        handleSubmitButton={handleSave}
      >
        <Box
          p={2}
          sx={{
            '.fc-timegrid-event-short .fc-event-time::after': {
              content: 'none',
            },
            '.fc-event': {
              cursor: 'pointer',
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
            options={slotDurationOption}
          />
          <br />
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView={'timeGridDay'}
            views={{
              timeGrid: {
                allDaySlot: false,
              },
            }}
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
        </Box>
      </CustomCommonDialog>
    </>
  );
};
