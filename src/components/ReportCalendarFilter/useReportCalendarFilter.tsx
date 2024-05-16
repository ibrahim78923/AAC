import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useReportCalendarFilter = (props: any) => {
  const { setCalendarFilter } = props;
  const theme = useTheme();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: undefined,
    key: 'selection',
  });

  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDate(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? 'simple-popover' : undefined;

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges?.selection);
  };

  const handleApplyFilter = () => {
    setCalendarFilter(selectionRange);
    setAnchorElDate(null);
  };

  return {
    theme,
    handleSelect,
    idDate,
    openDate,
    handleCloseDate,
    handleClickDate,
    anchorElDate,
    setAnchorElDate,
    selectionRange,
    setSelectionRange,
    handleApplyFilter,
  };
};
