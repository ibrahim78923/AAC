import { TIME_FORMAT } from '@/constants';
import { TIME_UNITS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
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
    if (selectedEvents?.length < 3) {
      setSelectedEvents([...selectedEvents, info]);
      setValue(
        'selectedSlots',
        [...selectedEvents, info]?.map((item: any) => ({
          startHour: dayjs(item?.start)?.format(TIME_FORMAT?.TH),
          endHour: dayjs(item?.end)?.format(TIME_FORMAT?.TH),
        })),
      );
      return;
    }
    errorSnackbar('Slot limit exceeds');
  };
  const handleAllowDuration = (info: any) => {
    return (
      info?.end?.getTime() - info?.start?.getTime() ===
      timeSlotDuration?.value * TIME_UNITS?.MS_PER_MINUTE
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
