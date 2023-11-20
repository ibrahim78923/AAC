import { useTheme } from '@mui/material';

export function useRecentActivities() {
  const theme = useTheme();
  const currentDate = new Date();
  const formatDateTime = (date: any) => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };
  return {
    theme,
    currentDate,
    formatDateTime,
  };
}
