import { errorSnackbar } from '@/utils/api';
import { fullNameInitial } from '@/utils/avatarUtils';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useDynamicQuestions = (props: any) => {
  const { parentMethods, sectionIndex, questionIndex } = props;
  const [isOption, setIsOption] = useState(true);
  const { fields, append, remove } = useFieldArray({
    name: `sections.${sectionIndex}.questions.${questionIndex}.text`,
    control: parentMethods?.control,
  });
  const watchText = parentMethods?.watch(
    `sections.${sectionIndex}.questions.${questionIndex}.text`,
  );
  const watchOptions = parentMethods?.watch(
    `sections.${sectionIndex}.questions.${questionIndex}.options`,
  );
  const handleSaveOption = () => {
    if (
      watchText?.some((item: any) => !item?.text || item?.text?.trim() === '')
    ) {
      errorSnackbar('Please fill all the fields');
      return;
    }
    const textValues = watchText?.map((item: any) => item?.text?.trim());
    const duplicates = textValues?.filter(
      (item: any, index: number) => textValues?.indexOf(item) !== index,
    );
    if (duplicates?.length > 0) {
      errorSnackbar(
        `Duplicate text value found: ( ${fullNameInitial(duplicates)})`,
      );
      return;
    }
    setIsOption(true);
    parentMethods?.setValue(
      `sections.${sectionIndex}.questions.${questionIndex}.options`,
      watchText?.map((item: any, index: number) => {
        return {
          text: item?.text,
          index,
        };
      }),
    );
  };
  const handleRemove = (index: number) => {
    if (fields?.length > 1) {
      remove(index);
    }
  };
  const handleEditOption = () => {
    if (!watchText?.length) {
      append({ text: '1' });
      setIsOption(false);
      return;
    }
    setIsOption(false);
  };
  return {
    isOption,
    setIsOption,
    fields,
    append,
    remove,
    watchOptions,
    handleSaveOption,
    handleRemove,
    handleEditOption,
  };
};
