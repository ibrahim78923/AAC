import { useTheme } from '@mui/material';
import { listViewDetailsData, meetingCardsDetails } from './ListView.data';
import { useEffect, useState } from 'react';

export const useListView = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [cardValue, setCardValue] = useState('All');
  const [listData, setListData] = useState<any>([]);
  const meetings = meetingCardsDetails(theme);

  useEffect(() => {
    if (cardValue === 'All') {
      setListData(listViewDetailsData);
    } else {
      const listFilter = listViewDetailsData?.filter(
        (item: any) => item?.status === cardValue,
      );
      setListData(listFilter);
    }
  }, [cardValue]);

  return { theme, meetings, search, setSearch, setCardValue, listData };
};
