import { useTheme } from '@mui/material';

export function useAnnouncementDashboardCard() {
  const theme = useTheme();
  const currentDate = new Date();
  const formatDateTime = (date: Date) => {
    const timeDifference = currentDate.getTime() - date.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else {
      return '3 hours ago';
    }
  };

  return {
    theme,
    currentDate,
    formatDateTime,
  };
}
