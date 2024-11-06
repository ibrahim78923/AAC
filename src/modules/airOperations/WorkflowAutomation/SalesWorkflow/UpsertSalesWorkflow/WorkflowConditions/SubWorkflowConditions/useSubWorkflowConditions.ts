import { useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  useLazyGetAdminUserDropdownListQuery,
  useLazyGetDealDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, warningSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import {
  SubWorkflowConditionsI,
  WorkflowConditionStateI,
} from './SubWorkflowConditions.interface';

export const useSubWorkflowConditions = (props: SubWorkflowConditionsI) => {
  const { control, index, parentField, removeParent, setValue, watch } = props;
  const [fieldNameOnChange, setFieldNameOnChange] =
    useState<WorkflowConditionStateI>({ subIndex: null, newValue: '' });
  const [conditionFieldOnChange, setConditionFieldOnChange] =
    useState<WorkflowConditionStateI>({ subIndex: null, newValue: '' });
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
  const adminUserDropdown = useLazyGetAdminUserDropdownListQuery();
  const router = useRouter();
  const moduleType = watch('module');
  useEffect(() => {
    setValue(
      `groups.${index}.conditions.${fieldNameOnChange?.subIndex}.condition`,
      '',
    );
    setValue(
      `groups.${index}.conditions.${fieldNameOnChange?.subIndex}.fieldValue`,
      null,
    );
  }, [fieldNameOnChange?.newValue]);
  useEffect(() => {
    setValue(
      `groups.${index}.conditions.${conditionFieldOnChange?.subIndex}.fieldValue`,
      null,
    );
  }, [conditionFieldOnChange?.newValue]);
  if (!router?.query?.id) {
    useEffect(() => {
      fields?.forEach((_, subIndex) => {
        setValue(`groups.${index}.conditions.${subIndex}.fieldName`, null);
        setValue(`groups.${index}.conditions.${subIndex}.condition`, '');
        setValue(`groups.${index}.conditions.${subIndex}.fieldValue`, null);
      });
    }, [moduleType]);
  }
  const watchFieldName = (subIndex?: number) => {
    if (!!watch(`groups.${index}.conditions.${subIndex}.fieldName`)) {
      return true;
    }
    return false;
  };
  return {
    fields,
    handleAppend,
    handleDeleteClick,
    dealDropdown,
    adminUserDropdown,
    setFieldNameOnChange,
    setConditionFieldOnChange,
    watchFieldName,
  };
};
