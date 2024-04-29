import { useTheme } from '@mui/material';
import { meetingCardsDetails } from './ListView.data';

export const useListView = () => {
  const theme = useTheme();
  const meetings = meetingCardsDetails(theme);
  return { theme, meetings };
};
