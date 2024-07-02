import {
  useDeleteFeedbackSurveySectionMutation,
  usePatchCloneFeedbackSectionMutation,
  usePatchMergeFeedbackSectionMutation,
} from '@/services/airServices/feedback-survey';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useCreateFeedback = (props: any) => {
  const { methods } = props;
  const { control, watch, setValue } = methods;
  const [isSection, setIsSection] = useState(0);
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
  };
};
