import { useMemo, useState } from 'react';
import {
  endOfFormat,
  startOfAddTime,
  startOfFormat,
  subtractTime,
} from '@/lib/date-time';
import { DATE_MONTH_FORMAT } from '@/constants';

export default function useDateFilter({ setDateCalendar, dateCalendar }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null | any>(
    null,
  );
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedWeekSpan = useMemo(() => {
    return `${startOfFormat(
      dateCalendar,
      'week',
      DATE_MONTH_FORMAT?.API,
    )} - ${endOfFormat(dateCalendar, 'week', DATE_MONTH_FORMAT?.API)}`;
  }, [dateCalendar]);

  const prevButtonClickHandler = () => {
    setDateCalendar(subtractTime(dateCalendar, 1, 'week'));
  };

  const nextButtonClickHandler = () => {
    setDateCalendar(startOfAddTime(dateCalendar, 'week', 1, 'week'));
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
