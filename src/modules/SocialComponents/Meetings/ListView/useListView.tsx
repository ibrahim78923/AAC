import { useTheme } from '@mui/material';
import { listViewDetailsData, meetingCardsDetails } from './ListView.data';
import { useEffect, useState } from 'react';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import { useRouter } from 'next/router';

export const useListView = () => {
  const theme = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [cardValue, setCardValue] = useState('All');
  const [listData, setListData] = useState<any>([]);
  const meetings = meetingCardsDetails(theme);

  useEffect(() => {
    if (cardValue === MEETINGS_DETAILS_TYPE?.ALL) {
      setListData(listViewDetailsData);
    } else {
      const listFilter = listViewDetailsData?.filter(
        (item: any) => item?.status === cardValue,
      );
      setListData(listFilter);
    }
  }, [cardValue]);

  return { theme, meetings, search, setSearch, setCardValue, listData, router };
};
