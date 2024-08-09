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
import { ApiResponseI, Meeting } from './ListView.interface';

export const useListView = () => {
  const theme = useTheme();
  const router: any = useRouter();
  const meetingsType = router?.query?.type;
  const [search, setSearch] = useState<string>('');
  const [cardValue, setCardValue] = useState<string>(
    MEETINGS_DETAILS_TYPE?.ALL,
  );
  const [listData, setListData] = useState<Meeting[]>([]);
  const [openForm, setOpenForm] = useState<Record<string, any>>({});
  const [deleteModal, setDeleteModal] = useState<Record<string, any>>({});
  const [isActiveCard, setIsActiveCard] = useState<any>(
    meetingsType ? meetingsType : MEETINGS_DETAILS_TYPE?.ALL_MEETINGS,
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
    ];
    const meetingParam = buildQueryParams(additionalParams);

    const meetingParameter = {
      queryParams: meetingParam,
    };

    try {
      const response: ApiResponseI = (await getMeetingListTrigger(
        meetingParameter,
      )?.unwrap()) as ApiResponseI;
      setListData(response?.data?.meetings);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    getMeetingListData();
  }, [search, page, pageLimit, cardValue]);

  const activeCard = (meetingType: string, meetingHeading: string) => {
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

  const [deleteMeetingsTrigger, deleteMeetingsStatus] =
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
    openForm,
    setOpenForm,
    meetingActiveType,
    deleteMeetingsStatus,
  };
};
