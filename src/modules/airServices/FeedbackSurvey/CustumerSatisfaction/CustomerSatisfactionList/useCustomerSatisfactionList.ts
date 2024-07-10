import { PAGINATION } from '@/config';
import { ARRAY_INDEX, FEEDBACK_SURVEY_TYPES } from '@/constants/strings';
import {
  useDeleteFeedbackSurveyMutation,
  useLazyGetFeedbackListQuery,
  usePatchDefaultSurveyMutation,
  usePostCloneFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  feedbackDropdown,
  surveyDataTypes,
} from './CustomerSatisfactionList.data';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants';

export const useCustomerSatisfactionList = (props: any) => {
  const { status } = props;
  const router = useRouter();
  const [activeCheck, setActiveCheck] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [defaultLoading, setDefaultLoading] = useState<any>({});
  const [getFeedbackList, { data, isLoading, isFetching, isError, isSuccess }] =
    useLazyGetFeedbackListQuery();
  const [deleteSurveyTrigger, { isLoading: deleteLoading }] =
    useDeleteFeedbackSurveyMutation();
  const [cloneSurveyTrigger, { isLoading: cloneLoading }] =
    usePostCloneFeedbackSurveyMutation();
  const [patchDefaultSurveyTrigger, { isLoading: patchLoading }] =
    usePatchDefaultSurveyMutation();
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
    await getFeedbackList({
      search,
      page,
      limit,
      status,
      surveyType: FEEDBACK_SURVEY_TYPES?.CUSTOMER_SATISFACTION,
    });
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
      successSnackbar(response?.data?.message && 'Survey clone successfully');
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const handleTitleClick = (surveyData: any) => {
    if (
      getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_EDIT,
      ) &&
      surveyData?.status === surveyDataTypes?.draft
    ) {
      return router?.push({
        pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
        query: {
          type: surveyDataTypes?.customerSatisfaction,
          id: surveyData?._id,
        },
      });
    } else if (
      getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_VIEW_RESPONSE,
      ) &&
      surveyData?.status !== surveyDataTypes?.draft
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
  const handleDefaultSurvey = async (surveyValues: any) => {
    setDefaultLoading({ [surveyValues?._id]: true });
    const patchParams = { id: surveyValues?._id };
    const response: any = await patchDefaultSurveyTrigger(patchParams);
    if (response?.data?.message) {
      successSnackbar(
        `${surveyValues?.surveyTitle} set as default successfully`,
      );
      setDefaultLoading({});
    } else {
      errorSnackbar(response?.error?.data?.message);
      setDefaultLoading({});
    }
  };
  const feedbackDropdownOption = feedbackDropdown(
    activeCheck,
    setOpenModal,
    router,
    handleCloneSurvey,
    cloneLoading,
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
    handleDeleteSurvey,
    openModal,
    setOpenModal,
    deleteLoading,
    feedbackDropdownOption,
    handleTitleClick,
    handleDefaultSurvey,
    patchLoading,
    defaultLoading,
  };
};
