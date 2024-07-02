import { PAGINATION } from '@/config';
import { ARRAY_INDEX, FEEDBACK_SURVEY_TYPES } from '@/constants/strings';
import {
  useDeleteFeedbackSurveyMutation,
  useLazyGetFeedbackListQuery,
  usePatchFeedbackSurveyMutation,
  usePostCloneFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { feedbackDropdown } from './CustomerSupportList.data';

export const useCustomerSupportList = (props: any) => {
  const { status } = props;
  const router = useRouter();
  const [activeCheck, setActiveCheck] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getFeedbackList, { data, isLoading, isFetching, isError, isSuccess }] =
    useLazyGetFeedbackListQuery();
  const [deleteSurveyTrigger, { isLoading: deleteLoading }] =
    useDeleteFeedbackSurveyMutation();
  const [cloneSurveyTrigger, { isLoading: cloneLoading }] =
    usePostCloneFeedbackSurveyMutation();
  const [patchSurveyTrigger, { isLoading: patchLoading }] =
    usePatchFeedbackSurveyMutation();
  const handleDeleteSurvey = async () => {
    const deleteParams = new URLSearchParams();
    activeCheck?.forEach((item: any) => deleteParams?.append('ids', item?._id));
    const response: any = await deleteSurveyTrigger(deleteParams);
    if (response?.data?.message) {
      setOpenModal(false);
      setActiveCheck([]);
      successSnackbar(response?.data?.message && 'Survey deleted successfully');
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const handleFeedbackList = async () => {
    const queryParams = {
      search,
      page,
      limit,
      status,
      surveyType: FEEDBACK_SURVEY_TYPES?.CUSTOMER_SUPPORT,
    };
    await getFeedbackList(queryParams);
  };
  useEffect(() => {
    handleFeedbackList();
  }, [search, page, limit, status]);
  const handleCloneSurvey = async (closeMenu: any) => {
    const cloneParams = {
      id: activeCheck?.[ARRAY_INDEX?.ZERO]?._id,
    };
    const response: any = await cloneSurveyTrigger(cloneParams);
    if (response?.data?.message) {
      closeMenu();
      successSnackbar(
        response?.data?.message &&
          `${response?.data?.data?.surveyTitle} clone successfully`,
      );
      setActiveCheck([]);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const handleStatus = async (closeMenu: any, status: string) => {
    const patchParams = {
      params: {
        id: activeCheck?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        status: status?.toLowerCase(),
      },
    };
    const response: any = await patchSurveyTrigger(patchParams);
    if (response?.data?.message) {
      closeMenu();
      successSnackbar(
        `${response?.data?.data?.surveyTitle} ${status} Successfully`,
      );
      setActiveCheck([]);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const feedbackDropdownOption = feedbackDropdown(
    activeCheck,
    setOpenModal,
    router,
    handleCloneSurvey,
    cloneLoading,
    handleStatus,
    patchLoading,
  );
  const feedbackTableData = data?.data?.feedbackSurvey;
  const meta = data?.data?.meta;
  return {
    setSearch,
    activeCheck,
    setActiveCheck,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    router,
    feedbackTableData,
    meta,
    openModal,
    setOpenModal,
    handleDeleteSurvey,
    deleteLoading,
    feedbackDropdownOption,
  };
};
