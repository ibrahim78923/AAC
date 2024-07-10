import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFieldArray } from 'react-hook-form';
import {
  useDeleteFeedbackSurveyQuestionMutation,
  usePatchFeedbackSurveyMutation,
} from '@/services/airServices/feedback-survey';
import { errorSnackbar } from '@/utils/api';
import { questionTypeData } from './Questions.data';

export const useQuestions = (props: any) => {
  const {
    methods,
    sectionIndex,
    sectionAppend,
    setSubmitType,
    setSubmitIndex,
    sectionVerification,
    unSaveSection,
    sectionCondition,
  } = props;
  const { watch, control, setValue } = methods;
  const [questionIndex, setQuestionIndex] = useState<number | null>(0);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(0);
  const [openImport, setOpenImport] = useState(false);
  const router = useRouter();
  const surveyId = router?.query?.id;
  const { fields, append, remove } = useFieldArray({
    name: `sections.${sectionIndex}.questions`,
    control,
  });
  const copyQuestion = (index: number) => {
    if (sectionCondition) {
      errorSnackbar(
        `Please save ( Section ${
          unSaveSection?.index + 1
        } ) first to perform this action`,
      );
      return;
    }
    const questionTitle = watch(
      `sections.${sectionIndex}.questions.${index}.questionTitle`,
    );
    const questionType = watch(
      `sections.${sectionIndex}.questions.${index}.questionType`,
    );
    const options = watch(
      `sections.${sectionIndex}.questions.${index}.options`,
    );
    const description = watch(
      `sections.${sectionIndex}.questions.${index}.description`,
    );
    const isRequired = watch(
      `sections.${sectionIndex}.questions.${index}.isRequired`,
    );
    const text = watch(`sections.${sectionIndex}.questions.${index}.text`);
    append({
      questionTitle,
      questionType,
      options,
      description,
      isRequired,
      text,
    });
  };
  const [deleteQuestionTrigger, { isLoading: deleteLoading }] =
    useDeleteFeedbackSurveyQuestionMutation();
  const deleteQuestion = async (index: number) => {
    const sectionId = watch(`sections.${sectionIndex}.id`);
    const questionId = watch(`sections.${sectionIndex}.questions.${index}.id`);
    const deleteParams = {
      surveyId,
      sectionId,
      questionId,
    };
    if (sectionCondition) {
      errorSnackbar(
        `Please save ( Section ${
          unSaveSection?.index + 1
        } ) first to perform this action`,
      );
      return;
    }
    if (fields?.length <= 1) {
      return;
    }
    if (fields?.length > 1 && !!questionId) {
      setDeleteIndex(index);
      const response: any = await deleteQuestionTrigger(deleteParams);
      if (response?.data?.message) {
        remove(index);
        return;
      }
      return;
    } else if (fields?.length > 1 && !questionId) {
      remove(index);
      return;
    }
  };

  const appendQuestion = () => {
    if (sectionCondition) {
      errorSnackbar(
        `Please save ( Section ${
          unSaveSection?.index + 1
        } ) first to perform this action`,
      );
      return;
    }
    append({
      questionTitle: '',
      questionType: {
        label: 'Multiple Choice',
        value: 'multipleChoice',
      },
      options: [{ text: '1', index: 0 }],
      description: '',
      isRequired: false,
    });
  };

  const appendText = () => {
    if (sectionCondition) {
      errorSnackbar(
        `Please save ( Section ${
          unSaveSection?.index + 1
        } ) first to perform this action`,
      );
      return;
    }
    append({
      questionTitle: '',
      questionType: { value: 'text' },
      option: undefined,
      description: '',
    });
  };
  const [patchFeedbackSurveyTrigger, { isLoading: updateLoading }] =
    usePatchFeedbackSurveyMutation();
  const appendSection = async () => {
    if (!sectionVerification) {
      errorSnackbar(
        `Please save ( Section ${
          unSaveSection?.index + 1
        } ) first then add new section`,
      );
      return;
    }
    const updateSurvey = {
      body: {
        sections: [
          {
            heading: '',
            description: '',
          },
        ],
      },
      params: { id: surveyId },
    };
    const response: any = await patchFeedbackSurveyTrigger(updateSurvey);
    if (response?.data?.message) {
      sectionAppend({
        id: response?.data?._id,
        title: '',
        description: '',
        questions: [
          {
            questionTitle: '',
            questionType: {
              label: 'Multiple Choice',
              value: 'multipleChoice',
            },
            option: null,
            description: '',
            isRequired: false,
          },
        ],
      });
    }
  };
  const handleSaveQuestion = () => {
    setSubmitIndex({
      sectionId: watch(`sections.${sectionIndex}.id`),
      index: sectionIndex,
    });
    setSubmitType(questionTypeData?.saveQuestion);
  };
  const handleImportOpen = () => {
    if (sectionCondition) {
      errorSnackbar(
        `Please save ( Section ${
          unSaveSection?.index + 1
        } ) first then add new section`,
      );
      return;
    }
    setOpenImport(true);
  };
  const handleDragEnd = (result: any) => {
    if (!result?.destination) return;
    const reorderedForm = watch(`sections.${sectionIndex}.questions`);
    const [movedItem] = reorderedForm?.splice(result?.source?.index, 1);
    reorderedForm?.splice(result?.destination?.index, 0, movedItem);
    setValue(`sections.${sectionIndex}.questions`, reorderedForm);
  };
  return {
    deleteQuestion,
    fields,
    copyQuestion,
    watch,
    questionIndex,
    setQuestionIndex,
    appendQuestion,
    appendSection,
    appendText,
    handleSaveQuestion,
    handleDragEnd,
    updateLoading,
    deleteLoading,
    deleteIndex,
    sectionCondition,
    openImport,
    setOpenImport,
    handleImportOpen,
  };
};
