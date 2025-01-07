import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setLoyaltyDashboardDateRange } from '@/redux/slices/airLoyaltyProgram/dashboard';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';

export const useDashboard = () => {
  const [selectionRange, setSelectionRange] = useState<{
    startDate: Date;
    endDate: Date;
    key?: string;
  }>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );
  const dispatch = useAppDispatch();

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };
  const formattedDate = {
    startDate:
      selectionRange?.startDate &&
      otherDateFormat(selectionRange?.startDate, CALENDAR_FORMAT?.YMD),
    endDate:
      selectionRange?.endDate &&
      otherDateFormat(selectionRange?.endDate, CALENDAR_FORMAT?.YMD),
  };
  const handleApplyDate = () => {
    dispatch(setLoyaltyDashboardDateRange(formattedDate));
    setAnchorElDate(null);
  };
  useEffect(() => {
    dispatch(setLoyaltyDashboardDateRange(formattedDate));
  }, []);

  return {
    selectionRange,
    setSelectionRange,
    anchorElDate,
    setAnchorElDate,
    handleCloseDate,
    handleApplyDate,
  };
};
