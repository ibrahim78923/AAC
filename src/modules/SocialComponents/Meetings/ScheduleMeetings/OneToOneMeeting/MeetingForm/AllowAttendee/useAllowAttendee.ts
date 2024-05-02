import { useState } from 'react';

export const useAllowAttendee = (props: any) => {
  const { watch, setValue } = props;
  const [openCalender, setOpenCalender] = useState(false);
  const watchFrom = watch('fromTime');
  const watchTo = watch('toTime');
  const allowAttendee = watch('allowAttendee');
  const handleClose = () => {
    setValue('allowAttendee', false);
    setOpenCalender(false);
  };
  const handleSave = () => {
    setOpenCalender(false);
    setValue('allowAttendee', true);
  };
  const handleOpen = () => {
    if (allowAttendee) {
      return setValue('allowAttendee', false);
    }
    setOpenCalender(true);
  };
  return {
    openCalender,
    watchFrom,
    watchTo,
    handleOpen,
    handleClose,
    handleSave,
  };
};
