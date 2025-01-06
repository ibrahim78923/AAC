import { useEffect, useState } from 'react';
import { getWidgetsDataArray } from './Dashboard.data';
import { useAppDispatch } from '@/redux/store';
import { setLoyaltyDashboardDateRange } from '@/redux/slices/airLoyaltyProgram/dashboard';

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
  const handleApplyDate = () => {
    const { startDate, endDate } = selectionRange;
    dispatch(setLoyaltyDashboardDateRange({ startDate, endDate }));
    setAnchorElDate(null);
  };
  useEffect(() => {
    dispatch(setLoyaltyDashboardDateRange(selectionRange));
  }, []);
  const widgetsDataArray = getWidgetsDataArray();

  return {
    selectionRange,
    setSelectionRange,
    anchorElDate,
    setAnchorElDate,
    handleCloseDate,
    handleApplyDate,
    widgetsDataArray,
  };
};
