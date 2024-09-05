import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { meetingCardArray } from './CalendarView.data';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ROUTER_CONSTANTS } from '@/constants/strings';
import {
  useDeleteMeetingsMutation,
  useLazyGetMeetingsCalenderListQuery,
} from '@/services/commonFeatures/meetings';

export const useCalendarView = () => {
  const [currentView, setCurrentView] = useState('timeGridDay');
  const [search, setSearch] = useState();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<any>({});
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const router = useRouter();
  const theme: any = useTheme();
  const [trigger, status] = useLazyGetMeetingsCalenderListQuery();
  const params = {
    search,
  };
  useEffect(() => {
    trigger(params);
  }, [search]);

  const meetingCard = meetingCardArray(theme, status);

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
    setEventData(clickInfo);
    handleCloseViewMorePopover();
  };
  const [deleteMeetingsTrigger, deleteMeetingsStatus]: any =
    useDeleteMeetingsMutation();

  const handleDeleteSubmit = async () => {
    const deleteMeetingsParameter = {
      queryParams: {
        id: openDeleteModal?.data?._id,
        platform: openDeleteModal?.data?.platform?.toLowerCase(),
      },
    };
    try {
      await deleteMeetingsTrigger(deleteMeetingsParameter)?.unwrap();
      successSnackbar();
      setOpenDeleteModal({});
      await trigger(null);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleDelete = (findData: any) => {
    setOpenDeleteModal({ isOpen: true, data: findData });
    handleCloseViewMorePopover();
  };

  const handleEventMouseEnter = (eventId: string) => {
    setHoveredEvent(eventId);
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
  };

  const meetingActiveType = (activeMeeting: any) => {
    return ROUTER_CONSTANTS?.[activeMeeting];
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
    status,
    meetingActiveType,
    deleteMeetingsStatus,
  };
};
