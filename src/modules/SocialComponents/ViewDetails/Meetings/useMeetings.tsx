import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MEETINGS_DETAILS_TYPE, ROUTER_CONSTANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import {
  useDeleteMeetingsMutation,
  useLazyGetMeetingsListQuery,
} from '@/services/commonFeatures/meetings';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { buildQueryParams } from '@/utils/api';
import { MODULE_NAME_FOR_MEETINGS } from '@/constants';
import { meetingCardsDetails } from './Meetings.data';

export const useMeetings = () => {
  const theme = useTheme();
  const router: any = useRouter();
  const moduleId = router?.query?.id;
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
      ['moduleId', moduleId],
      ['moduleType', MODULE_NAME_FOR_MEETINGS?.COMPANIES],
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
    moduleId,
    deleteMeetingsStatus,
    getMeetingListStatus,
    setPageLimit,
    setPage,
    openForm,
    setOpenForm,
    meetingActiveType,
  };
};
