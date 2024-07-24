import { PAGINATION } from '@/config';
import {
  ARRAY_INDEX,
  FEEDBACK_STATUS,
  FEEDBACK_SURVEY_TYPES,
} from '@/constants/strings';
import {
  useDeleteFeedbackSurveyMutation,
  useLazyGetFeedbackListQuery,
  usePatchFeedbackSurveyMutation,
  usePostCloneFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { feedbackDropdown, surveyDataTypes } from './CustomerSupportList.data';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants';

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
  const singleSurvey = activeCheck?.[ARRAY_INDEX?.ZERO];
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
      id: singleSurvey?._id,
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
        id: singleSurvey?._id,
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
  const handleTitleClick = (surveyData: any) => {
    if (
      (getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_EDIT,
      ) &&
        surveyData?.status === FEEDBACK_STATUS?.DRAFT) ||
      surveyData?.status === FEEDBACK_STATUS?.INACTIVE
    ) {
      return router?.push({
        pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
        query: {
          type: surveyDataTypes?.customerSupport,
          id: surveyData?._id,
        },
      });
    } else if (
      getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_VIEW_RESPONSE,
      ) &&
      surveyData?.status === FEEDBACK_STATUS?.PUBLISHED
    ) {
      return router?.push({
        pathname: AIR_SERVICES?.FEEDBACK_SURVEY_RESPONSES,
        query: {
          surveyId: surveyData?._id,
        },
      });
    }
    return;
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
    handleTitleClick,
  };
};
