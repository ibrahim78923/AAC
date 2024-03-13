import { errorSnackbar } from '@/utils/api';
import { useFieldArray } from 'react-hook-form';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups.${index}.conditions`,
  });
  const handleDeleteClick = (subIndex: any) => {
    if (parentField?.length === 1 && fields?.length < 2) {
      errorSnackbar('Cannot Delete');
      return;
    }
    if (fields?.length > 1) {
      remove(subIndex);
    }
    if (parentField?.length >= 2 && fields?.length === 1) {
      removeParent(index);
    }
  };
  return {
    fields,
    append,
    handleDeleteClick,
  };
};
