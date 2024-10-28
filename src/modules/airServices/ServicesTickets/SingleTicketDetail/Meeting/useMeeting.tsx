import { useTheme } from '@mui/material';
import { meetingCardsDetails } from './Meeting.data';
import { useEffect, useState } from 'react';
import {
  MEETINGS_DETAILS_TYPE,
  MODULE_TYPE,
  ROUTER_CONSTANTS,
} from '@/constants/strings';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';
import {
  useDeleteMeetingsMutation,
  useLazyGetMeetingsListQuery,
} from '@/services/commonFeatures/meetings';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useMeeting = () => {
  const theme = useTheme();
  const router: any = useRouter();
  const ticketId = router?.query?.ticketId;
  const meetingsType = router?.query?.type;
  const [search, setSearch] = useState('');
  const [cardValue, setCardValue] = useState<any>(MEETINGS_DETAILS_TYPE?.ALL);
  const [listData, setListData] = useState<any>([]);
  const [openForm, setOpenForm] = useState<any>({});
  const [deleteModal, setDeleteModal] = useState<any>({});
  const [isActiveCard, setIsActiveCard] = useState<any>(
    meetingsType ? meetingsType : MEETINGS_DETAILS_TYPE?.ALL,
  );

  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const [getMeetingListTrigger, getMeetingListStatus]: any =
    useLazyGetMeetingsListQuery();
  const getMeetingListData = async (pages = page) => {
    const additionalParams = [
      ['page', pages + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['type', cardValue],
      ['moduleId', ticketId],
      ['moduleType', MODULE_TYPE?.TICKET],
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
  const filterMeetingData = getMeetingListStatus?.data?.data;

  const meetings = meetingCardsDetails(theme, filterMeetingData);

  const activeCard = (meetingType: string, meetingHeading: string) => {
    setIsActiveCard(meetingHeading);
    setCardValue(meetingType);
  };

  useEffect(() => {
    if (meetingsType != null) {
      setCardValue(meetingsType);
    } else {
      setCardValue(MEETINGS_DETAILS_TYPE?.ALL);
    }
  }, [meetingsType]);

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

  const meetingActiveType = (activeMeeting: string) => {
    return ROUTER_CONSTANTS?.[activeMeeting];
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
    ticketId,
    deleteMeetingsStatus,
    getMeetingListStatus,
    setPageLimit,
    setPage,
    openForm,
    setOpenForm,
    meetingActiveType,
  };
};
