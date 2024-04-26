import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

export default function useDateFilter({ setDateCalendar, dateCalendar }: any) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedWeekSpan = useMemo(() => {
    return `${dayjs(dateCalendar)?.startOf('week')?.format('MMM DD')} - ${dayjs(
      dateCalendar,
    )
      ?.endOf('week')
      ?.format('MMM DD')}`;
  }, [dateCalendar]);

  const prevButtonClickHandler = () => {
    setDateCalendar(dayjs(dateCalendar)?.subtract(1, 'week')?.toISOString());
  };

  const nextButtonClickHandler = () => {
    setDateCalendar(
      dayjs(dateCalendar)?.add(1, 'week')?.startOf('week')?.toISOString(),
    );
  };

  return {
    handleOpen,
    formattedWeekSpan,
    prevButtonClickHandler,
    nextButtonClickHandler,
    open,
    anchorEl,
    handleClose,
  };
}
