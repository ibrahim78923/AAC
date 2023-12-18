import { useState } from 'react';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const useWorkflowDateRange = (props: any) => {
  const { setValue } = props;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setValue('scheduleDateRange', dates);
  };
  const formatDate = (date: any) => {
    return date ? dayjs(date)?.format(DATE_FORMAT?.UI) : '';
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return {
    startDate,
    endDate,
    handleDateChange,
    formatDate,
    handleClick,
    handleClose,
    open,
    anchorEl,
  };
};
