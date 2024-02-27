import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useHeader = () => {
  const theme = useTheme();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: null,
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
  };
};
