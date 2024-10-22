import { useState } from 'react';
import { ARRAY_INDEX } from '@/constants/strings';
import { DATE_MONTH_FORMAT } from '@/constants';
import {
  addTime,
  endOfTime,
  otherDateFormat,
  subtractTime,
} from '@/lib/date-time';

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
  const formattedMonthSpan = `${otherDateFormat(
    dateRange?.[ARRAY_INDEX?.ZERO]?.startDate,
    DATE_MONTH_FORMAT?.API,
  )} - ${otherDateFormat(
    dateRange?.[ARRAY_INDEX?.ZERO]?.endDate,
    DATE_MONTH_FORMAT?.API,
  )}`;

  // Previous Click
  const handlePrevClick = () => {
    const newDate = subtractTime(
      dateRange?.[ARRAY_INDEX?.ZERO]?.startDate,
      1,
      'month',
      true,
    );

    setDateRange([
      {
        startDate: newDate,
        endDate: endOfTime(newDate, 'month', true),
        key: 'selection',
      },
    ]);
  };

  // Next Click
  const handleNextClick = () => {
    const newDate = addTime(
      dateRange?.[ARRAY_INDEX?.ZERO]?.startDate,
      1,
      'month',
      true,
    );

    setDateRange([
      {
        startDate: newDate,
        endDate: endOfTime(newDate, 'month', true),
        key: 'selection',
      },
    ]);
  };

  return {
    handleOpen,
    formattedMonthSpan,
    handlePrevClick,
    handleNextClick,
    open,
    anchorEl,
    handleClose,
  };
}
