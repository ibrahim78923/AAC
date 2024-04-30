import { useTheme } from '@mui/material';
import { listViewDetailsData, meetingCardsDetails } from './ListView.data';
import { useEffect, useState } from 'react';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useListView = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [cardValue, setCardValue] = useState('All');
  const [listData, setListData] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<any>();
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

  const submitDeleteModal = async () => {
    try {
      await successSnackbar('Delete Successfully');
      setDeleteModal(false);
    } catch (error: any) {
      errorSnackbar(error);
    }
  };

  return {
    theme,
    meetings,
    search,
    setSearch,
    setCardValue,
    listData,
    deleteModal,
    setDeleteModal,
    submitDeleteModal,
  };
};
