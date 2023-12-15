import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useFieldArray } from 'react-hook-form';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `workflowConditions.${index}.conditions`,
  });
  const handleDeleteClick = (subIndex: any) => {
    if (parentField?.length === 2 && fields?.length < 2) {
      enqueueSnackbar('Cannot Delete', {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
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
