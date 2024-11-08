import { AIR_SERVICES } from '@/constants/routes';
import {
  useDeleteFeedbackSurveySectionMutation,
  usePatchCloneFeedbackSectionMutation,
  usePatchFeedbackSurveyMutation,
  usePatchMergeFeedbackSectionMutation,
  usePostSurveyEmailMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { emailHtml, feedbackValuesType } from './CreateFeedback.data';
import { getSession } from '@/utils';
import { useTheme } from '@mui/material';
import { CreateFeedbackI } from './CreateFeedback.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useCreateFeedback = (props: CreateFeedbackI) => {
  const { methods } = props;
  const { control, watch, setValue } = methods;
  const [isSection, setIsSection] = useState(0);
  const [isStatus, setIsStatus] = useState(false);
  const router = useRouter();
  const surveyId = router?.query?.id;
  const { fields, append, remove } = useFieldArray({
    name: 'sections',
    control,
  });
  const theme = useTheme();
  const sessionData: any = getSession();
  const [deleteSectionTrigger, { isLoading: deleteLoading }] =
    useDeleteFeedbackSurveySectionMutation();
  const [mergeSectionTrigger, { isLoading: mergeLoading }] =
    usePatchMergeFeedbackSectionMutation();
  const [cloneSectionTrigger, { isLoading: cloneLoading }] =
    usePatchCloneFeedbackSectionMutation();
  const [patchFeedbackSurveyTrigger, { isLoading: updateLoading }] =
    usePatchFeedbackSurveyMutation();
  const [postSurveyEmailTrigger, { isLoading: emailLoading }] =
    usePostSurveyEmailMutation();
  const removeSection = async (index: number, setClose: () => void) => {
    const sectionId = watch(`sections.${index}.id`);
    const deleteParams = {
      sectionId,
      surveyId,
    };
    try {
      await deleteSectionTrigger(deleteParams)?.unwrap();
      setClose();
      remove(index);
      return;
    } catch (error) {}
  };
  const cloneSection = async (index: number, setClose: () => void) => {
    const watchSection = watch(`sections.${index}`);
    const sectionId = watch(`sections.${index}.id`);
    const cloneParams = { surveyId, sectionId };
    try {
      await cloneSectionTrigger(cloneParams)?.unwrap();
      setClose();
      append(watchSection);
    } catch (error) {}
  };
  const mergeSection = async (index: number, setClose: () => void) => {
    const currentSection = watch(`sections.${index}`);
    const aboveSection = watch(`sections.${index - 1}`);
    const mergedQuestions = [
      ...(aboveSection?.questions || []),
      ...(currentSection?.questions || []),
    ];
    const sectionId = watch(`sections.${index}.id`);
    const mergeParams = { surveyId, sectionId };
    try {
      await mergeSectionTrigger(mergeParams)?.unwrap();
      setClose();
      setValue(`sections.${index - 1}.questions`, mergedQuestions);
      remove(index);
    } catch (error) {}
  };
  const sendSurveyPeople = watch('sendSurveyPeople');
  const shareSurveyPeople = watch('shareSurveyPeople');
  const customerSupportLinkType = watch('customerSupportLinkType');
  const surveyTitle = watch('surveyTitle');
  const uuid = watch('UUID');
  const recipientsEmails =
    customerSupportLinkType === feedbackValuesType?.viaEmail &&
    sendSurveyPeople?.length
      ? sendSurveyPeople
      : customerSupportLinkType === feedbackValuesType?.viaMagicLink &&
          shareSurveyPeople?.length
        ? shareSurveyPeople
        : [];
  const handleSendEmail = async () => {
    if (!!sendSurveyPeople?.length || !!shareSurveyPeople?.length) {
      const emailParams = new FormData();
      emailParams?.append('recipients', recipientsEmails);
      emailParams?.append(
        'subject',
        `Invitation to Participate in ${surveyTitle} Survey`,
      );
      emailParams?.append(
        'html',
        emailHtml({ sessionData, theme, uuid, surveyTitle }),
      );
      try {
        await postSurveyEmailTrigger(emailParams)?.unwrap();
      } catch (error) {}
    }
  };
  const handlePublish = async (handleClose: () => void) => {
    setIsStatus(true);
    const publishParams = {
      body: {
        status: feedbackValuesType?.published,
      },
      params: { id: surveyId },
    };
    try {
      handleSendEmail();
      await patchFeedbackSurveyTrigger(publishParams)?.unwrap();
      handleClose();
      successSnackbar('Survey published successfully');
      router?.push({
        pathname: AIR_SERVICES?.FEEDBACK_SURVEY,
        query: { type: router?.query?.type },
      });
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    setIsStatus(false);
  };
  const handleSaveDraft = async (handleClose: () => void) => {
    const draftParams = {
      body: {
        status: feedbackValuesType?.draft,
      },
      params: { id: surveyId },
    };
    try {
      await patchFeedbackSurveyTrigger(draftParams)?.unwrap();
      handleClose();
      successSnackbar('Survey save as draft successfully');
      router?.push({
        pathname: AIR_SERVICES?.FEEDBACK_SURVEY,
        query: { type: router?.query?.type },
      });
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  return {
    fields,
    append,
    isSection,
    setIsSection,
    removeSection,
    cloneSection,
    mergeSection,
    deleteLoading,
    mergeLoading,
    cloneLoading,
    handlePublish,
    handleSaveDraft,
    updateLoading,
    emailLoading,
    isStatus,
  };
};
