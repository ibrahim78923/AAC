import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useGetDashboardCardsTicketsQuery,
  useGetRecentActivitiesQuery,
} from '@/services/airServices/dashboard';
import { useGetCustomerAnnouncementQuery } from '@/services/airServices/dashboard';

export function useDashboard() {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAnnouncementDrawerOpen, setIsAnnouncementDrawerOpen] =
    useState<boolean>(false);
  const handleIconButton = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleAnnouncementIconButton = () => {
    setIsAnnouncementDrawerOpen(!isAnnouncementDrawerOpen);
  };
  const {
    data: cardsData,
    isLoading: cardsLoading,
    isError: cardsError,
    isFetching: cardsFetching,
  } = useGetDashboardCardsTicketsQuery(null);
  const cardData = cardsData?.data;

  const {
    data,
    isLoading: announcementLoading,
    isError: announcementError,
    isFetching: announcementFetching,
  } = useGetCustomerAnnouncementQuery(null);
  const customerAnnouncement = data?.annoucements;

  const {
    data: recentActivitie,
    isLoading: recentActivitiesLoading,
    isError: recentActivitiesError,
    isFetching: recentActivitiesFetching,
  } = useGetRecentActivitiesQuery(null);
  const recentActivities = recentActivitie?.data;

  return {
    setIsDrawerOpen,
    isDrawerOpen,
    theme,
    handleIconButton,
    handleAnnouncementIconButton,
    isAnnouncementDrawerOpen,
    setIsAnnouncementDrawerOpen,
    cardData,
    customerAnnouncement,
    recentActivities,
    isLoading: cardsLoading || announcementLoading || recentActivitiesLoading,
    isError: cardsError || announcementError || recentActivitiesError,
    isFetching:
      cardsFetching || announcementFetching || recentActivitiesFetching,
  };
}
