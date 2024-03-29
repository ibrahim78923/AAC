import { useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useLazyGetContactDropdownListQuery,
  useLazyGetDealDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, warningSnackbar } from '@/utils/api';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent, setValue, watch } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups.${index}.conditions`,
  });
  const handleDeleteClick = (subIndex: any) => {
    if (parentField?.length === 2 && fields?.length < 2) {
      warningSnackbar('Cannot Delete');
      return;
    }
    if (fields?.length > 1) {
      remove(subIndex);
    }
    if (parentField?.length >= 2 && fields?.length === 1) {
      removeParent(index);
    }
  };
  const handleAppend = () => {
    if (fields?.length < 10) {
      append({ fieldName: '', condition: '', fieldValue: null });
    } else {
      errorSnackbar('Condition limit exceeds');
    }
  };
  const dealDropdown = useLazyGetDealDropdownListQuery();
  const contactDropdown = useLazyGetContactDropdownListQuery();
  const moduleType = watch('module');
  useEffect(() => {
    fields?.forEach((_, subIndex) => {
      setValue(`groups.${index}.conditions.${subIndex}.fieldName`, '');
      setValue(`groups.${index}.conditions.${subIndex}.condition`, '');
      setValue(`groups.${index}.conditions.${subIndex}.fieldValue`, '');
    });
  }, [moduleType]);
  return {
    fields,
    handleAppend,
    handleDeleteClick,
    dealDropdown,
    contactDropdown,
  };
};
