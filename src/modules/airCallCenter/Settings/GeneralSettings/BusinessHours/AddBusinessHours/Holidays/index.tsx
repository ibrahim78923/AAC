import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import React from 'react';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { useHolidays } from './useHolidays';
import { HolidayDrawer } from './HolidayDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { HolidaysData } from './Holidays.data';

import { calendarImage } from '@/assets/images';
import { AlertModals } from '@/components/AlertModals';

const Holidays = () => {
  const {
    setSearch,
    isHolidayDrawerOpen,
    setIsHolidayDrawerOpen,
    getColumns,
    showHoliday,
    setShowHoliday,
    openAlertModal,
    handleCloseAlertModal,
    handleHolidayDelete,
  } = useHolidays();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mb: '2rem',
        }}
      >
        <Search label="Search Here" setSearchBy={setSearch} />
        <Button
          variant="contained"
          sx={{ height: '36px', fontWeight: '500' }}
          startIcon={<PlusShared />}
          onClick={() => setIsHolidayDrawerOpen(true)}
        >
          Add Holidays
        </Button>
      </Box>
      <HolidayDrawer
        isHolidayDrawerOpen={isHolidayDrawerOpen}
        setIsHolidayDrawerOpen={setIsHolidayDrawerOpen}
        showHoliday={showHoliday}
        setShowHoliday={setShowHoliday}
      />
      <TanstackTable
        columns={getColumns}
        data={showHoliday ? HolidaysData : []}
        noDataTableText={'No Holiday added yet'}
        noDataTableImage={calendarImage}
      />
      <AlertModals
        type="delete"
        open={openAlertModal}
        handleClose={handleCloseAlertModal}
        handleSubmitBtn={handleHolidayDelete}
        message="Are you sure you want to disable it?"
      />
    </>
  );
};

export default Holidays;
