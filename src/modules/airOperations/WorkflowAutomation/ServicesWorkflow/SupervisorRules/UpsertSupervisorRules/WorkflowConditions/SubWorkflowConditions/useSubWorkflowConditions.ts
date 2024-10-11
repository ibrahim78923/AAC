import { SCHEMA_KEYS } from '@/constants/strings';
import {
  useLazyGetAgentsDropDownInWorkflowQuery,
  useLazyGetDepartmentDropdownInWorkflowQuery,
  useLazyGetLocationsDropdownInWorkflowQuery,
  useLazyGetRequesterDropdownInWorkflowQuery,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useGetSchemaKeysQuery } from '@/services/common-APIs';
import { errorSnackbar } from '@/utils/api';
import { useFieldArray } from 'react-hook-form';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent } = props;
  const params = {
    collectionName: SCHEMA_KEYS?.TICKETS,
  };
  const { data } = useGetSchemaKeysQuery(params);
  const schemaKeysData = data?.data;
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
    if (parentField?.length >= 1 && fields?.length === 1) {
      removeParent(index);
    }
  };
  const agentApiQuery = useLazyGetAgentsDropDownInWorkflowQuery();
  const departmentApiQuery = useLazyGetDepartmentDropdownInWorkflowQuery();
  const requestersApiQuery = useLazyGetRequesterDropdownInWorkflowQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownInWorkflowQuery();
  return {
    fields,
    append,
    handleDeleteClick,
    schemaKeysData,
    agentApiQuery,
    departmentApiQuery,
    requestersApiQuery,
    apiQueryLocations,
  };
};
