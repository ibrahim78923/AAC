import { SCHEMA_KEYS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar } from '@/lib/snackbar';
import {
  useLazyGetAssetTypeInWorkflowQuery,
  useLazyGetDepartmentDropdownInWorkflowQuery,
  useLazyGetLocationsDropdownInWorkflowQuery,
  useLazyGetRequesterDropdownInWorkflowQuery,
  useLazyGetUsersListDropdownInWorkflowQuery,
  useLazyGetAgentsDropDownInWorkflowQuery,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useGetSchemaKeysQuery } from '@/services/common-APIs';
import { useFieldArray } from 'react-hook-form';

export const useSubWorkflowConditions = (props: any) => {
  const { control, index, parentField, removeParent } = props;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

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
  const apiAssetType = useLazyGetAssetTypeInWorkflowQuery();
  const apiUsersListDropdown = useLazyGetUsersListDropdownInWorkflowQuery();
  return {
    fields,
    append,
    handleDeleteClick,
    schemaKeysData,
    agentApiQuery,
    departmentApiQuery,
    requestersApiQuery,
    apiQueryLocations,
    apiAssetType,
    apiUsersListDropdown,
    productId,
  };
};
