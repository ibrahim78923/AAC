import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useFieldArray } from 'react-hook-form';
import { salesValues } from '../../UpsertSalesWorkflow.data';
import { useEffect } from 'react';
import {
  useLazyGetContactDropdownListQuery,
  useLazyGetDealDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent, setValue, watch } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups.${index}.conditions`,
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
  const handleAppend = () => {
    if (fields?.length < 10) {
      append(salesValues?.groups?.[0]?.conditions);
    } else {
      enqueueSnackbar('Condition limit exceeds', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const dealDropdown = useLazyGetDealDropdownListQuery();
  const contactDropdown = useLazyGetContactDropdownListQuery();
  const moduleType = watch('module');
  useEffect(() => {
    fields?.forEach((_, subIndex) => {
      setValue(`groups.${index}.conditions.${subIndex}.key`, '');
      setValue(`groups.${index}.conditions.${subIndex}.condition`, '');
      setValue(`groups.${index}.conditions.${subIndex}.value`, '');
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
