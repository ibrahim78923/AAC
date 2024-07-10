import { AIR_SERVICES } from '@/constants';
import {
  useDeleteFeedbackSurveySectionMutation,
  usePatchCloneFeedbackSectionMutation,
  usePatchFeedbackSurveyMutation,
  usePatchMergeFeedbackSectionMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { feedbackValuesType } from './CreateFeedback.data';

export const useCreateFeedback = (props: any) => {
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
  const [deleteSectionTrigger, { isLoading: deleteLoading }] =
    useDeleteFeedbackSurveySectionMutation();
  const [mergeSectionTrigger, { isLoading: mergeLoading }] =
    usePatchMergeFeedbackSectionMutation();
  const [cloneSectionTrigger, { isLoading: cloneLoading }] =
    usePatchCloneFeedbackSectionMutation();
  const [patchFeedbackSurveyTrigger, { isLoading: updateLoading }] =
    usePatchFeedbackSurveyMutation();
  const removeSection = async (index: number, setClose: any) => {
    const sectionId = watch(`sections.${index}.id`);
    const deleteParams = {
      sectionId,
      surveyId,
    };
    const response: any = await deleteSectionTrigger(deleteParams);
    if (response?.data?.message) {
      setClose();
      remove(index);
      return;
    }
  };
  const cloneSection = async (index: number, setClose: any) => {
    const watchSection = watch(`sections.${index}`);
    const sectionId = watch(`sections.${index}.id`);
    const cloneParams = { surveyId, sectionId };
    const response: any = await cloneSectionTrigger(cloneParams);
    if (response?.data?.message) {
      setClose();
      append(watchSection);
    }
  };
  const mergeSection = async (index: number, setClose: any) => {
    const currentSection = watch(`sections.${index}`);
    const aboveSection = watch(`sections.${index - 1}`);
    const mergedQuestions = [
      ...(aboveSection?.questions || []),
      ...(currentSection?.questions || []),
    ];
    const sectionId = watch(`sections.${index}.id`);
    const mergeParams = { surveyId, sectionId };
    const response: any = await mergeSectionTrigger(mergeParams);
    if (response?.data?.message) {
      setClose();
      setValue(`sections.${index - 1}.questions`, mergedQuestions);
      remove(index);
    }
  };
  const handlePublish = async (handleClose: any) => {
    setIsStatus(true);
    const publishParams = {
      body: {
        status: feedbackValuesType?.published,
      },
      params: { id: surveyId },
    };
    const response: any = await patchFeedbackSurveyTrigger(publishParams);
    if (response?.data?.message) {
      handleClose();
      successSnackbar('Survey published successfully');
      router?.push(AIR_SERVICES?.FEEDBACK_SURVEY);
    } else {
      errorSnackbar(response?.error?.data?.message);
    }
    setIsStatus(false);
  };
  const handleSaveDraft = async (handleClose: any) => {
    const draftParams = {
      body: {
        status: feedbackValuesType?.draft,
      },
      params: { id: surveyId },
    };
    const response: any = await patchFeedbackSurveyTrigger(draftParams);
    if (response?.data?.message) {
      handleClose();
      successSnackbar('Survey save as draft successfully');
      router?.push(AIR_SERVICES?.FEEDBACK_SURVEY);
    } else {
      errorSnackbar(response?.error?.data?.message);
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
    isStatus,
  };
};
