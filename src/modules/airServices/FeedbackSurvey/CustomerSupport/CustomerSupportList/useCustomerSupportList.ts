import { PAGINATION } from '@/config';
import {
  ARRAY_INDEX,
  FEEDBACK_STATUS,
  FEEDBACK_SURVEY_PATH_TYPES,
  FEEDBACK_SURVEY_TYPES,
} from '@/constants/strings';
import {
  useDeleteFeedbackSurveyMutation,
  useLazyGetFeedbackListQuery,
  usePatchChangeSurveyStatusMutation,
  usePostCloneFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { feedbackDropdown } from './CustomerSupportList.data';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants/routes';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';

export const useCustomerSupportList = (props: { status?: string }) => {
  const { status } = props;
  const router = useRouter();
  const [activeCheck, setActiveCheck] = useState<FeedbackSurveyListI[]>([]);
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
  const [patchChangeSurveyStatusTrigger, { isLoading: statusLoading }] =
    usePatchChangeSurveyStatusMutation();
  const handleDeleteSurvey = async () => {
    const deleteParams = new URLSearchParams();
    activeCheck?.forEach((item) => deleteParams?.append('ids', item?._id));
    const response: any = await deleteSurveyTrigger(deleteParams);
    if (response?.data?.message) {
      setOpenModal(false);
      setActiveCheck([]);
      successSnackbar(response?.data?.message && 'Survey deleted successfully');
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const handleSearch = (searchValue: string) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(searchValue);
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
  const handleCloneSurvey = async (closeMenu: () => void) => {
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
  const handleStatus = async (closeMenu: () => void) => {
    const statusBody = {
      id: singleSurvey?._id,
      surveyType: FEEDBACK_SURVEY_TYPES?.CUSTOMER_SUPPORT,
      status: FEEDBACK_STATUS?.INACTIVE,
    };
    const response: any = await patchChangeSurveyStatusTrigger(statusBody);
    if (response?.data?.message) {
      closeMenu();
      successSnackbar(
        `${singleSurvey?.surveyTitle} ${FEEDBACK_STATUS?.INACTIVE} Successfully`,
      );
      setActiveCheck([]);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const handleTitleClick = (surveyData: FeedbackSurveyListI) => {
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
          type: FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SUPPORT,
          id: surveyData?._id,
        },
      });
    } else if (
      (getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_VIEW_RESPONSE,
      ) &&
        surveyData?.status === FEEDBACK_STATUS?.PUBLISHED) ||
      surveyData?.status === FEEDBACK_STATUS?.EXPIRED
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
  const handleCopy = (surveyLink?: string) => {
    const linkToCopy = surveyLink || '';
    navigator?.clipboard?.writeText(linkToCopy)?.then(() => {
      successSnackbar('Link copied to clipboard!');
    });
  };
  const feedbackDropdownOption = feedbackDropdown(
    activeCheck,
    setOpenModal,
    router,
    handleCloneSurvey,
    cloneLoading,
    handleStatus,
    statusLoading,
    handleCopy,
  );
  const feedbackTableData = data?.data?.feedbackSurvey;
  const meta = data?.data?.meta;
  return {
    handleSearch,
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
    handleFeedbackList,
  };
};
