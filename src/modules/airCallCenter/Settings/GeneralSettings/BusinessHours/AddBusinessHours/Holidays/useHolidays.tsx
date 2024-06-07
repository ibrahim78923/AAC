import { useState } from 'react';
import { columnsHolidays } from './Holidays.data';

export const useHolidays = () => {
  const [search, setSearch] = useState('');
  const [isHolidayDrawerOpen, setIsHolidayDrawerOpen] = useState(false);
  const getColumns = columnsHolidays(setIsHolidayDrawerOpen);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [showHoliday, setShowHoliday] = useState(false);
  return {
    search,
    setSearch,
    isHolidayDrawerOpen,
    setIsHolidayDrawerOpen,
    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    showHoliday,
    setShowHoliday,
  };
};
