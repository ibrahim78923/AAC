import { errorSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useQuestions = (props: any) => {
  const { methods, sectionIndex, sectionAppend } = props;
  const { watch, control, setValue } = methods;
  const [questionIndex, setQuestionIndex] = useState<number | null>(0);
  const [isSave, setIsSave] = useState(false);
  const { fields, append, remove } = useFieldArray({
    name: `section.${sectionIndex}.questions`,
    control,
  });

  const copyQuestion = (index: number) => {
    const questionTitle = watch(
      `section.${sectionIndex}.questions.${index}.questionTitle`,
    );
    const questionType = watch(
      `section.${sectionIndex}.questions.${index}.questionType`,
    );
    const options = watch(`section.${sectionIndex}.questions.${index}.options`);
    const description = watch(
      `section.${sectionIndex}.questions.${index}.description`,
    );
    const isRequired = watch(
      `section.${sectionIndex}.questions.${index}.isRequired`,
    );
    const text = watch(`section.${sectionIndex}.questions.${index}.text`);
    append({
      questionTitle,
      questionType,
      options,
      description,
      isRequired,
      text,
    });
  };

  const deleteQuestion = (index: number) => {
    if (fields?.length <= 1) {
      return;
    }
    remove(index);
  };

  const appendQuestion = () => {
    append({
      questionTitle: '',
      questionType: {
        label: 'Multiple Choice',
        value: 'multipleChoice',
      },
      option: null,
      description: '',
      isRequired: false,
    });
  };

  const appendText = () => {
    append({
      questionTitle: '',
      questionType: undefined,
      option: undefined,
      description: '',
    });
  };

  const appendSection = () => {
    if (!isSave) {
      errorSnackbar('Please save the questions before adding a new section');
      return;
    }
    sectionAppend({
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
    setIsSave(false);
  };
  const handleSaveQuestion = () => {
    setIsSave(true);
  };
  const handleDragEnd = (result: any) => {
    if (!result?.destination) return;
    const reorderedForm = watch(`section.${sectionIndex}.questions`);
    const [movedItem] = reorderedForm?.splice(result?.source?.index, 1);
    reorderedForm?.splice(result?.destination?.index, 0, movedItem);
    setValue(`section.${sectionIndex}.questions`, reorderedForm);
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
  };
};
