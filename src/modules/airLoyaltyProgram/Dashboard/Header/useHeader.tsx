import { useTheme } from '@mui/material';
import { MouseEvent, useState, useEffect } from 'react';
import { differenceInDays, format, isSameDay } from 'date-fns';

export const useHeader = (props: any) => {
  const { selectionRange, setSelectionRange, anchorElDate, setAnchorElDate } =
    props;

  const theme: any = useTheme();

  const [dateLabel, setDateLabel] = useState('Today');

  const handleClickDate = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElDate(event?.currentTarget);
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? 'simple-popover' : undefined;

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges?.selection);
  };

  const updateButtonLabel = () => {
    const { startDate, endDate } = selectionRange;
    const today = new Date();

    if (isSameDay(startDate, today) && isSameDay(endDate, today)) {
      setDateLabel('Today');
    } else if (
      differenceInDays(today, startDate) === 1 &&
      isSameDay(startDate, endDate)
    ) {
      setDateLabel('Yesterday');
    } else if (
      differenceInDays(endDate, startDate) === 6 &&
      startDate.getDay() === 0
    ) {
      setDateLabel('This Week');
    } else {
      const formattedStart = format(startDate, 'MMM dd');
      const formattedEnd = format(endDate, 'MMM dd');
      setDateLabel(`${formattedStart} - ${formattedEnd}`);
    }
  };

  useEffect(() => {
    updateButtonLabel();
  }, [selectionRange]);

  return { theme, handleClickDate, dateLabel, idDate, openDate, handleSelect };
};
