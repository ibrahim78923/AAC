import { FEEDBACK_SURVEY_LINK_TYPES } from '@/constants/strings';
import { successSnackbar } from '@/lib/snackbar';
import {
  useGetAllAgentsForFeedbackQuery,
  usePatchDefaultSurveyMutation,
  usePostSurveyEmailMutation,
} from '@/services/airServices/feedback-survey';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';
import { getSession } from '@/utils';
import { useTheme } from '@mui/material';
import { surveyEmailHtml } from './DefaultSurveyStatus.data';

export const useDefaultSurveyStatus = () => {
  const sessionData: any = getSession();
  const theme = useTheme();
  const [patchDefaultSurveyTrigger, { isLoading }] =
    usePatchDefaultSurveyMutation();
  const [postSurveyEmailTrigger] = usePostSurveyEmailMutation();
  const { data: allAgentEmailData } = useGetAllAgentsForFeedbackQuery({});

  const handleDefaultSurvey = async (surveyValues: FeedbackSurveyListI) => {
    const patchParams = { id: surveyValues?._id };
    try {
      await patchDefaultSurveyTrigger(patchParams)?.unwrap();
      successSnackbar(
        `${surveyValues?.surveyTitle} set as default successfully`,
      );
      if (
        surveyValues?.satisfactionSurveyLinkType ===
        FEEDBACK_SURVEY_LINK_TYPES?.TO_ALL_AGENTS
      ) {
        handleEmailSend(surveyValues);
      }
    } catch (error) {}
  };
  const handleEmailSend = async (surveyValues: FeedbackSurveyListI) => {
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
    try {
      await postSurveyEmailTrigger(emailParams)?.unwrap();
    } catch (error) {}
  };
  return { handleDefaultSurvey, isLoading };
};
