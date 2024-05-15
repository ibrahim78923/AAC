import { useTheme } from '@mui/material';
import { listViewDetailsData, meetingCardsDetails } from './ListView.data';
import { useEffect, useState } from 'react';
import { MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useListView = () => {
  const theme = useTheme();
  const router = useRouter();
  const meetingsType = router?.query?.type;
  const [search, setSearch] = useState('');
  const [cardValue, setCardValue] = useState<any>(MEETINGS_DETAILS_TYPE?.ALL);
  const [listData, setListData] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<any>();
  const [isActiveCard, setIsActiveCard] = useState<any>(
    meetingsType ? meetingsType : MEETINGS_DETAILS_TYPE?.ALL,
  );
  const meetings = meetingCardsDetails(theme);

  const activeCard = (meetingHeading: any) => {
    setIsActiveCard(meetingHeading);
  };

  useEffect(() => {
    if (meetingsType != null) {
      setCardValue(meetingsType);
    } else {
      setCardValue(MEETINGS_DETAILS_TYPE?.ALL);
    }
  }, [meetingsType]);

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
    router,
    isActiveCard,
    setIsActiveCard,
    activeCard,
  };
};
