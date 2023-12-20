import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  meetingsListData,
  meetingsListsColumnsFunction,
} from './Meetings.data';

export const useMeetings = () => {
  const theme = useTheme();
  const [selectedMeetingsList, setSelectedMeetingsList] = useState([]);

  const meetingsListsColumns = meetingsListsColumnsFunction(
    selectedMeetingsList,
    setSelectedMeetingsList,
    meetingsListData,
    theme,
  );
  return {
    meetingsListsColumns,
    selectedMeetingsList,
  };
};
