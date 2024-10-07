import dayjs from 'dayjs';
import { useState } from 'react';
import { ARRAY_INDEX } from '@/constants/strings';
import { DATE_MONTH_FORMAT } from '@/constants';

export default function useDateFilter({ dateRange, setDateRange }: any) {
  //Date Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Date to be displayed
  const formattedWeekSpan = `${dayjs(
    dateRange?.[ARRAY_INDEX?.ZERO]?.startDate,
  )?.format(DATE_MONTH_FORMAT?.API)} - ${dayjs(
    dateRange?.[ARRAY_INDEX?.ZERO]?.endDate,
  )?.format(DATE_MONTH_FORMAT?.API)}`;

  // Previous Click
  const handlePrevClick = () => {
    const newDate = dayjs(dateRange?.[ARRAY_INDEX?.ZERO]?.startDate)
      ?.subtract(1, 'week')
      ?.toDate();

    setDateRange([
      {
        startDate: newDate,
        endDate: dayjs(newDate)?.add(1, 'week')?.toDate(),
        key: 'selection',
      },
    ]);
  };

  // Next Click
  const handleNextClick = () => {
    const newDate = dayjs(dateRange?.[ARRAY_INDEX?.ZERO]?.endDate)?.toDate();
    setDateRange([
      {
        startDate: newDate,
        endDate: dayjs(newDate)?.add(1, 'week')?.toDate(),
        key: 'selection',
      },
    ]);
  };

  return {
    handleOpen,
    formattedWeekSpan,
    handlePrevClick,
    handleNextClick,
    open,
    anchorEl,
    handleClose,
  };
}
