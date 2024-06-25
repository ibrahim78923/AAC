import { useTheme } from '@mui/material';
import { useGetDashboardCardsTicketsQuery } from '@/services/airServices/dashboard';

export const useDashboard = () => {
  const theme = useTheme();
  const {
    data: cardsData,
    isLoading,
    isFetching,
  } = useGetDashboardCardsTicketsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const cardData = cardsData?.data;

  return {
    theme,
    cardData,
    isLoading,
    isFetching,
  };
};
