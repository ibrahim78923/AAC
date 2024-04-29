import { useTheme } from '@mui/material';
import { useState } from 'react';
import { meetingCardArray } from './CalendarView.data';

export const useCalendarView = () => {
  const [currentView, setCurrentView] = useState('timeGridDay'); // Initial view is month view
  const [search, setSearch] = useState();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);

  const theme: any = useTheme();
  const meetingCard = meetingCardArray(theme);

  const handleViewChange = (view: any) => {
    setCurrentView(view);
  };

  const handleEventClick = (clickInfo: any) => {
    setOpenEventModal(true);
    setEventData(clickInfo?.event?._def?.extendedProps);
  };
  return {
    handleViewChange,
    currentView,
    search,
    setSearch,
    meetingCard,
    openEventModal,
    setOpenEventModal,
    eventData,
    handleEventClick,
  };
};
