// import { HeaderCalendarView } from "./HeaderCalendarView";

// export const CalendarView = () => {
//   return (
//     <>
//       <HeaderCalendarView/>
//     </>
//   );
// };

// import Search from "@/components/Search";
// import { Box, Button } from "@mui/material";
// import { useState } from "react";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import { TodayCalendarView } from "./TodayCalendarView";
// import { WeeklyCalendarView } from "./WeeklyCalendarView";
// import { MonthlyCalendarView } from "./MonthlyCalendarView";
// import { YearlyCalendarView } from "./YearlyCalendarView";
// import styles from './CalendarView.module.scss';

// export const CalendarView = () => {
//   const [search, setSearch] = useState()
//   const [view, setView] = useState('today');

//   const handleViewChange = (viewName: any) => {
//     setView(viewName);
//   };

//   return (
//     <Box className={styles?.calendarWrapper}>
//       <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
//         <Search label="Search Here" setSearchBy={setSearch} />
//         <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
//           <Button
//             variant= {view === 'today' ? "contained" : "outlined"}
//             startIcon={<CalendarTodayIcon />}
//             color="secondary"
//             onClick={() => handleViewChange('today')}
//             sx={{backgroundColor: view === 'today' ? 'primary.main' : undefined}}
//           >
//             Today
//           </Button>
//           <Button
//             variant= {view === 'weekly' ? "contained" : "outlined"}
//             startIcon={<DateRangeIcon />}
//             color="secondary"
//             onClick={() => handleViewChange('weekly')}
//             sx={{backgroundColor: view === 'weekly' ? 'primary.main' : undefined}}
//           >
//             Weekly
//           </Button>
//           <Button
//             variant= {view === 'monthly' ? "contained" : "outlined"}
//             startIcon={<CalendarMonthIcon />}
//             color="secondary" onClick={() => handleViewChange('monthly')}
//             sx={{backgroundColor: view === 'monthly' ? 'primary.main' : undefined}}
//           >
//             Monthly
//           </Button>
//           <Button
//             variant= {view === 'yearly' ? "contained" : "outlined"}
//             startIcon={<EventAvailableIcon />}
//             color="secondary" onClick={() => handleViewChange('yearly')}
//             sx={{backgroundColor: view === 'yearly' ? 'primary.main' : undefined}}
//           >
//             yearly
//           </Button>
//         </Box>
//       </Box>
//       <br />
//       <br />
//       <br />
//       {view === 'today' && <TodayCalendarView />}
//       {view === 'weekly' && <WeeklyCalendarView />}
//       {view === 'monthly' && <MonthlyCalendarView />}
//       {view === 'yearly' && <YearlyCalendarView />}
//     </Box>
//   );
// };
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const CalendarView = () => {
  const [currentView, setCurrentView] = useState('timeGridDay'); // Initial view is month view
  const [search, setSearch] = useState();

  const handleViewChange = (view: any) => {
    setCurrentView(view);
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
            variant={currentView === 'timeGridDay' ? 'contained' : 'outlined'}
            startIcon={<CalendarTodayIcon />}
            color="secondary"
            onClick={() => handleViewChange('timeGridDay')}
            sx={{
              backgroundColor:
                currentView === 'timeGridDay' ? 'primary.main' : undefined,
            }}
          >
            Today
          </Button>
          <Button
            variant={currentView === 'timeGridWeek' ? 'contained' : 'outlined'}
            startIcon={<DateRangeIcon />}
            color="secondary"
            onClick={() => handleViewChange('timeGridWeek')}
            sx={{
              backgroundColor:
                currentView === 'timeGridWeek' ? 'primary.main' : undefined,
            }}
          >
            Weekly
          </Button>
          <Button
            variant={currentView === 'dayGridMonth' ? 'contained' : 'outlined'}
            startIcon={<CalendarMonthIcon />}
            color="secondary"
            onClick={() => handleViewChange('dayGridMonth')}
            sx={{
              backgroundColor:
                currentView === 'dayGridMonth' ? 'primary.main' : undefined,
            }}
          >
            Monthly
          </Button>
          <Button
            variant={
              currentView === 'multiMonthYear' ? 'contained' : 'outlined'
            }
            startIcon={<EventAvailableIcon />}
            color="secondary"
            onClick={() => handleViewChange('multiMonthYear')}
            sx={{
              backgroundColor:
                currentView === 'multiMonthYear' ? 'primary.main' : undefined,
            }}
          >
            yearly
          </Button>
        </Box>
      </Box>
      <br />
      <br />
      <div>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          initialView={
            currentView === 'multiMonthYear' ? 'multiMonthYear' : 'dayGridMonth'
          }
          allDaySlot={false}
          events={[
            { title: 'Event 1', start: '2024-04-01' },
            { title: 'Event 2', start: '2024-04-02' },
            { title: 'Event 3', start: '2024-04-03' },
          ]}
        />
      </div>
    </>
  );
};
