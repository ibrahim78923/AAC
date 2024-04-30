import { useTheme } from '@mui/material';
import { useState } from 'react';
import { meetingCardArray } from './CalendarView.data';
import { useRouter } from 'next/router';

export const useCalendarView = () => {
  const [currentView, setCurrentView] = useState('timeGridDay');
  const [search, setSearch] = useState();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);

  const router = useRouter();
  const theme: any = useTheme();
  const meetingCard = meetingCardArray(theme);

  const handleViewChange = (view: any) => {
    setCurrentView(view);
  };
  const handleCloseViewMorePopover = () => {
    const viewMorePopover = document?.querySelector('.fc-more-popover');
    if (viewMorePopover) {
      viewMorePopover.style.display = 'none';
    }
  };
  const handleEventClick = (clickInfo: any) => {
    setOpenEventModal(true);
    setEventData(clickInfo?.event?._def?.extendedProps);
    handleCloseViewMorePopover();
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
    router,
  };
};
