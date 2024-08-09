import { useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useLazyGetAdminUserDropdownListQuery,
  useLazyGetDealDropdownListQuery,
  useLazyGetLifeCycleStagesDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, warningSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { SubWorkflowConditionsI } from './SubWorkflowConditions.interface';

export const useSubWorkflowConditions = (props: SubWorkflowConditionsI) => {
  const { control, index, parentField, removeParent, setValue, watch } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups.${index}.conditions`,
  });
  const handleDeleteClick = (subIndex: number) => {
    if (parentField?.length === 1 && fields?.length < 2) {
      warningSnackbar('Cannot Delete');
      return;
    }
    if (fields?.length > 1) {
      remove(subIndex);
    }
    if (parentField?.length >= 1 && fields?.length === 1) {
      removeParent(index);
    }
  };
  const handleAppend = () => {
    if (fields?.length < 10) {
      append({ fieldName: null, condition: '', fieldValue: null });
    } else {
      errorSnackbar('Condition limit exceeds');
    }
  };
  const dealDropdown = useLazyGetDealDropdownListQuery();
  const stagesDropdown = useLazyGetLifeCycleStagesDropdownListQuery();
  const adminUserDropdown = useLazyGetAdminUserDropdownListQuery();
  const router = useRouter();
  const moduleType = watch('module');
  if (!router?.query?.id) {
    useEffect(() => {
      fields?.forEach((_, subIndex) => {
        setValue(`groups.${index}.conditions.${subIndex}.fieldName`, null);
        setValue(`groups.${index}.conditions.${subIndex}.condition`, '');
        setValue(`groups.${index}.conditions.${subIndex}.fieldValue`, null);
      });
    }, [moduleType]);
  }
  return {
    fields,
    handleAppend,
    handleDeleteClick,
    dealDropdown,
    stagesDropdown,
    adminUserDropdown,
  };
};
