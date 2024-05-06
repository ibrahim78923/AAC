import { errorSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';

export const useAllowAttendee = (props: any) => {
  const { watch, setValue } = props;
  const [openCalender, setOpenCalender] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const timeSlotDuration = watch('timeSlotDuration');
  const watchFrom = watch('startTime');
  const watchTo = watch('endTime');
  const allowAttendee = watch('allowAttendee');
  const handleClose = () => {
    setValue('allowAttendee', false);
    setOpenCalender(false);
    setSelectedEvents([]);
  };
  useEffect(() => {
    setSelectedEvents([]);
  }, [timeSlotDuration]);
  const handleSave = () => {
    if (selectedEvents?.length > 0) {
      setOpenCalender(false);
      setValue('allowAttendee', true);
      return;
    }
    errorSnackbar('Select at least one slot');
  };
  const handleOpen = () => {
    if (allowAttendee) {
      return setValue('allowAttendee', false);
    }
    setOpenCalender(true);
  };
  const handleEvents = (info: any) => {
    if (selectedEvents?.length < 6) {
      setSelectedEvents([...selectedEvents, info]);
      setValue('selectedSlots', [
        [...selectedEvents]?.map((item: any) => ({
          start: item?.start,
          end: item?.end,
        })),
      ]);
      return;
    }
    errorSnackbar('Slot limit exceeds');
  };
  const handleAllowDuration = (info: any) => {
    return (
      info?.end?.getTime() - info?.start?.getTime() ===
      timeSlotDuration?.value * 60000
    );
  };
  return {
    openCalender,
    watchFrom,
    watchTo,
    handleOpen,
    handleClose,
    handleSave,
    handleEvents,
    selectedEvents,
    timeSlotDuration,
    handleAllowDuration,
  };
};
