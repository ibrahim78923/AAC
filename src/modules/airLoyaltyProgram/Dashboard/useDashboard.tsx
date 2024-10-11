import { useState } from 'react';
import { getWidgetsDataArray } from './Dashboard.data';

export const useDashboard = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleCloseDate = () => {
    setAnchorElDate(null);
  };
  const handleApplyDate = () => {};

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
