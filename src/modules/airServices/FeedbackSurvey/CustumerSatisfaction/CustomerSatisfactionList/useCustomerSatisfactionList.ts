import { PAGINATION } from '@/config';
import {
  ARRAY_INDEX,
  FEEDBACK_STATUS,
  FEEDBACK_SURVEY_LINK_TYPES,
  FEEDBACK_SURVEY_PATH_TYPES,
  FEEDBACK_SURVEY_TYPES,
} from '@/constants/strings';
import {
  useDeleteFeedbackSurveyMutation,
  useGetAllAgentsForFeedbackQuery,
  useLazyGetFeedbackListQuery,
  usePatchChangeSurveyStatusMutation,
  usePatchDefaultSurveyMutation,
  usePostCloneFeedbackSurveyMutation,
  usePostSurveyEmailMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  feedbackDropdown,
  surveyEmailHtml,
} from './CustomerSatisfactionList.data';
import { getActivePermissionsSession, getSession } from '@/utils';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';
import { useTheme } from '@mui/material';

export const useCustomerSatisfactionList = (props: { status?: string }) => {
  const { status } = props;
  const router = useRouter();
  const theme = useTheme();
  const [activeCheck, setActiveCheck] = useState<FeedbackSurveyListI[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [defaultLoading, setDefaultLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const sessionData: any = getSession();
  const [getFeedbackList, { data, isLoading, isFetching, isError, isSuccess }] =
    useLazyGetFeedbackListQuery();
  const [deleteSurveyTrigger, { isLoading: deleteLoading }] =
    useDeleteFeedbackSurveyMutation();
  const [cloneSurveyTrigger, { isLoading: cloneLoading }] =
    usePostCloneFeedbackSurveyMutation();
  const [patchDefaultSurveyTrigger, { isLoading: patchLoading }] =
    usePatchDefaultSurveyMutation();
  const [patchChangeSurveyStatusTrigger, { isLoading: statusLoading }] =
    usePatchChangeSurveyStatusMutation();
  const [postSurveyEmailTrigger] = usePostSurveyEmailMutation();
  const { data: allAgentEmailData } = useGetAllAgentsForFeedbackQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
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
  const handleCloneSurvey = async (closeMenu: () => void) => {
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
  const handleTitleClick = (surveyData: FeedbackSurveyListI) => {
    if (
      getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_EDIT,
      ) &&
      surveyData?.status === FEEDBACK_STATUS?.DRAFT
    ) {
      return router?.push({
        pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
        query: {
          type: FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SATISFACTION,
          id: surveyData?._id,
        },
      });
    } else if (
      getActivePermissionsSession()?.includes(
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_VIEW_RESPONSE,
      ) &&
      surveyData?.status !== FEEDBACK_STATUS?.DRAFT
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
  const handleDefaultSurvey = async (surveyValues: FeedbackSurveyListI) => {
    setDefaultLoading({ [surveyValues?._id]: true });
    const patchParams = { id: surveyValues?._id };
    try {
      await patchDefaultSurveyTrigger(patchParams)?.unwrap();
      successSnackbar(
        `${surveyValues?.surveyTitle} set as default successfully`,
      );
      setDefaultLoading({});
      if (
        surveyValues?.satisfactionSurveyLinkType ===
        FEEDBACK_SURVEY_LINK_TYPES?.TO_ALL_AGENTS
      ) {
        const emailParams = new FormData();
        emailParams?.append('recipients', allAgentEmailData);
        emailParams?.append(
          'subject',
          `Invitation to Participate in ${surveyValues?.surveyTitle} Survey`,
        );
        emailParams?.append(
          'html',
          surveyEmailHtml({
            sessionData,
            theme,
            magicLink: surveyValues?.magicLink,
            surveyTitle: surveyValues?.surveyTitle,
          }),
        );
        await postSurveyEmailTrigger(emailParams)?.unwrap();
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDefaultLoading({});
    }
  };
  const handleStatus = async (closeMenu: () => void) => {
    const statusBody = {
      id: activeCheck?.[ARRAY_INDEX?.ZERO]?._id,
      surveyType: FEEDBACK_SURVEY_TYPES?.CUSTOMER_SATISFACTION,
      status: FEEDBACK_STATUS?.DRAFT,
    };
    const response: any = await patchChangeSurveyStatusTrigger(statusBody);
    if (response?.data?.message) {
      closeMenu();
      successSnackbar(
        `${activeCheck?.[ARRAY_INDEX?.ZERO]
          ?.surveyTitle} Save as draft successfully`,
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
    statusLoading,
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
    handleFeedbackList,
  };
};
