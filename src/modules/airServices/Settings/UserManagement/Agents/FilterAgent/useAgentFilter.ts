import { useForm } from 'react-hook-form';
import {
  agentFilterFields,
  defaultValuesAgentFilter,
} from './AgentFilter.data';

import {
  useLazyGetDepartmentDropdownListForAgentsQuery,
  useLazyGetPermissionsRoleForUpsertAgentQuery,
} from '@/services/airServices/settings/user-management/agents';
import useAuth from '@/hooks/useAuth';
import { IAgentsProps } from '../Agents.interface';
import { PAGINATION } from '@/config';

export const useAgentFilter = (props: IAgentsProps) => {
  const {
    setAgentFilterDrawerOpen,
    setFilterAgentData,
    setPage,
    filterAgentData,
  } = props;

  const auth: any = useAuth();
  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[0]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const roleApiQueryParams = {
    productId,
    organizationCompanyAccountId,
    organizationId,
    limit: 50,
  };
  const agentFilterDrawerMethods: any = useForm({
    defaultValues: defaultValuesAgentFilter?.(filterAgentData),
  });

  const { handleSubmit, reset } = agentFilterDrawerMethods;

  const onSubmit = async (data: any) => {
    const agentFiltered: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(agentFiltered || {})?.length) {
      setFilterAgentData(agentFiltered);
      handleCloseDrawer();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setFilterAgentData(agentFiltered);
    handleCloseDrawer();
  };

  const handleCloseDrawer = () => {
    reset?.();
    setAgentFilterDrawerOpen(false);
  };
  const apiQueryDepartment = useLazyGetDepartmentDropdownListForAgentsQuery();
  const roleApiQuery = useLazyGetPermissionsRoleForUpsertAgentQuery?.();

  const agentFilterFormFields = agentFilterFields(
    apiQueryDepartment,
    roleApiQuery,
    roleApiQueryParams,
  );

  const resetAgentFilterForm = async () => {
    if (!!Object?.keys(filterAgentData)?.length) {
      setFilterAgentData({});
    }
    reset();
    setAgentFilterDrawerOpen?.(false);
  };

  return {
    onSubmit,
    handleCloseDrawer,
    agentFilterDrawerMethods,
    agentFilterFormFields,
    resetAgentFilterForm,
    handleSubmit,
  };
};
