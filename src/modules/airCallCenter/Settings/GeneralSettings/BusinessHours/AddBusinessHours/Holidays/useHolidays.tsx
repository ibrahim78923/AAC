import { useState } from 'react';
import { columnsHolidays } from './Holidays.data';

import { successSnackbar } from '@/utils/api';

export const useHolidays = () => {
  const [search, setSearch] = useState('');
  const [isHolidayDrawerOpen, setIsHolidayDrawerOpen] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const getColumns = columnsHolidays(setIsHolidayDrawerOpen, setOpenAlertModal);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [showHoliday, setShowHoliday] = useState(false);
  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };

  const handleHolidayDelete = () => {
    successSnackbar('Holiday deleted successfully');
    setOpenAlertModal(false);
  };
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
    openAlertModal,
    handleCloseAlertModal,
    handleHolidayDelete,
  };
};
