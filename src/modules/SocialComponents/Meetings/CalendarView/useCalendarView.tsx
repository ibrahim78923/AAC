import { useTheme } from '@mui/material';
import { useState } from 'react';
import { meetingCardArray } from './CalendarView.data';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useCalendarView = () => {
  const [currentView, setCurrentView] = useState('timeGridDay');
  const [search, setSearch] = useState();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const router = useRouter();
  const theme: any = useTheme();
  const meetingCard = meetingCardArray(theme);

  const handleViewChange = (view: any) => {
    setCurrentView(view);
  };
  const handleCloseViewMorePopover = () => {
    const viewMorePopover = document?.querySelector(
      '.fc-more-popover',
    ) as HTMLElement | null;
    if (viewMorePopover) {
      viewMorePopover.style.display = 'none';
    }
  };
  const handleEventClick = (clickInfo: any) => {
    setOpenEventModal(true);
    setEventData(clickInfo?.event);
    // setEventData(clickInfo?.event?._def?.extendedProps);
    handleCloseViewMorePopover();
  };
  const handleDeleteSubmit = async () => {
    try {
      await successSnackbar('Delete Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar(err);
    }
  };
  const handleDelete = () => {
    setOpenDeleteModal(true);
    handleCloseViewMorePopover();
  };

  const handleEventMouseEnter = (eventId: string) => {
    setHoveredEvent(eventId);
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
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
    setOpenDeleteModal,
    openDeleteModal,
    handleDelete,
    theme,
    hoveredEvent,
    handleEventMouseEnter,
    handleEventMouseLeave,
    handleDeleteSubmit,
  };
};
