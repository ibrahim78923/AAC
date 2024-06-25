import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useCreateFeedback = (props: any) => {
  const { methods } = props;
  const { control, watch, setValue } = methods;
  const [isSection, setIsSection] = useState(0);
  const { fields, append, remove } = useFieldArray({
    name: 'section',
    control,
  });
  const removeSection = (index: number) => {
    remove(index);
  };
  const cloneSection = (index: number) => {
    const watchSection = watch(`section.${index}`);
    append(watchSection);
  };
  const mergeSection = (index: number) => {
    const currentSection = watch(`section.${index}`);
    const aboveSection = watch(`section.${index - 1}`);
    const mergedQuestions = [
      ...(aboveSection?.questions || []),
      ...(currentSection?.questions || []),
    ];
    setValue(`section.${index - 1}.questions`, mergedQuestions);
    removeSection(index);
  };
  return {
    fields,
    append,
    isSection,
    setIsSection,
    removeSection,
    cloneSection,
    mergeSection,
  };
};
