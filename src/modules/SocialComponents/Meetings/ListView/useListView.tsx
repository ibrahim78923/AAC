import { useTheme } from '@mui/material';
import { meetingCardsDetails } from './ListView.data';
import { useEffect, useState } from 'react';
import { MEETINGS_DETAILS_TYPE, ROUTER_CONSTANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useDeleteMeetingsMutation,
  useLazyGetMeetingsListQuery,
} from '@/services/commonFeatures/meetings';
import { PAGINATION } from '@/config';

export const useListView = () => {
  const theme = useTheme();
  const router: any = useRouter();
  const meetingsType = router?.query?.type;
  const [search, setSearch] = useState('');
  const [cardValue, setCardValue] = useState<any>(MEETINGS_DETAILS_TYPE?.ALL);
  const [listData, setListData] = useState<any>([]);
  const [openForm, setOpenForm] = useState<any>({});
  const [deleteModal, setDeleteModal] = useState<any>({});
  const [isActiveCard, setIsActiveCard] = useState<any>(
    meetingsType ? meetingsType : MEETINGS_DETAILS_TYPE?.ALL_MEETINGS,
  );

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [getMeetingListTrigger, getMeetingListStatus]: any =
    useLazyGetMeetingsListQuery();
  const getMeetingListData = async (pages = page) => {
    const additionalParams = [
      ['page', pages + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['type', cardValue],
    ];
    const meetingParam: any = buildQueryParams(additionalParams);

    const meetingParameter = {
      queryParams: meetingParam,
    };

    try {
      await getMeetingListTrigger(meetingParameter)?.unwrap();
      setListData([]);
    } catch (error) {}
  };

  useEffect(() => {
    getMeetingListData();
  }, [search, page, pageLimit, cardValue]);
  const listViewMeetingData = getMeetingListStatus?.data?.data?.meetings;

  const activeCard = (meetingType: any, meetingHeading: any) => {
    setIsActiveCard(meetingHeading);
    setCardValue(meetingType);
    router?.push({
      pathname: ROUTER_CONSTANTS?.MEETINGS,
      query: {
        type: meetingType,
      },
    });
  };

  useEffect(() => {
    if (meetingsType != null) {
      setCardValue(meetingsType);
    } else {
      setCardValue(MEETINGS_DETAILS_TYPE?.ALL);
    }
  }, [meetingsType]);

  const meetings = meetingCardsDetails(theme, getMeetingListStatus);
  const [deleteMeetingsTrigger, deleteMeetingsStatus]: any =
    useDeleteMeetingsMutation();

  const submitDeleteModal = async () => {
    const deleteMeetingsParameter = {
      queryParams: {
        id: deleteModal?.data?._id,
        platform: deleteModal?.data?.type?.toLowerCase(),
      },
    };
    try {
      await deleteMeetingsTrigger(deleteMeetingsParameter)?.unwrap();
      successSnackbar();
      setDeleteModal({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const meetingActiveType = (activeMeeting: any) => {
    return ROUTER_CONSTANTS?.[activeMeeting];
  };

  useEffect(() => {
    router?.push({
      ...router?.basePath,
      query: { type: 'allMeetings' },
    });
  }, []);

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
    getMeetingListStatus,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    listViewMeetingData,
    openForm,
    setOpenForm,
    meetingActiveType,
    deleteMeetingsStatus,
  };
};
