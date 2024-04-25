import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { TodayCalendarView } from '../TodayCalendarView';
import { WeeklyCalendarView } from '../WeeklyCalendarView';
import { MonthlyCalendarView } from '../MonthlyCalendarView';
import { YearlyCalendarView } from '../YearlyCalendarView';

export const HeaderCalendarView = () => {
  const [search, setSearch] = useState();
  const [view, setView] = useState('today');

  const handleViewChange = (viewName: any) => {
    setView(viewName);
    {
      search;
    }
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Search label="Search Here" setSearchBy={setSearch} />
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Button
            variant="outlined"
            startIcon={<CalendarTodayIcon />}
            color="secondary"
            onClick={() => handleViewChange('today')}
          >
            Today
          </Button>
          <Button
            variant="outlined"
            startIcon={<DateRangeIcon />}
            color="secondary"
            onClick={() => handleViewChange('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            color="secondary"
            onClick={() => handleViewChange('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant="outlined"
            startIcon={<EventAvailableIcon />}
            color="secondary"
            onClick={() => handleViewChange('yearly')}
          >
            yearly
          </Button>
        </Box>
      </Box>
      <br />
      {view === 'today' && <TodayCalendarView />}
      {view === 'weekly' && <WeeklyCalendarView />}
      {view === 'monthly' && <MonthlyCalendarView />}
      {view === 'yearly' && <YearlyCalendarView />}
    </>
  );
};
