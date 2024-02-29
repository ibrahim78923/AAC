import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetDashboardCardsTicketsQuery } from '@/services/airServices/dashboard';
import { useGetCustomerAnnouncementQuery } from '@/services/airServices/dashboard';

export function useDashboard() {
  const theme = useTheme();
  const [isbarchart, setIsBarChart] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAnnouncementDrawerOpen, setIsAnnouncementDrawerOpen] =
    useState<boolean>(false);
  const handleIconButton = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleAnnouncementIconButton = () => {
    setIsAnnouncementDrawerOpen(!isAnnouncementDrawerOpen);
  };
  const { data: cardsData } = useGetDashboardCardsTicketsQuery(null);
  const cardData = cardsData?.data;

  const { data } = useGetCustomerAnnouncementQuery(null);
  const customerAnnouncement = data?.annoucements;
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    theme,
    handleIconButton,
    isbarchart,
    setIsBarChart,
    handleAnnouncementIconButton,
    isAnnouncementDrawerOpen,
    setIsAnnouncementDrawerOpen,
    cardData,
    customerAnnouncement,
  };
}
