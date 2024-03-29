import {
  useGetAgentDetailLevelQuery,
  useGetPermissionsRoleByIdForAgentQuery,
  useGetSingleAgentDetailsQuery,
  useGetSingleDepartmentDetailsQuery,
} from '@/services/airServices/settings/user-management/agents/details';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSingleAgentDetail = () => {
  const router = useRouter();
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const { agentId, departmentId, roleId } = router?.query;
  const getSingleAgentDetailsParameter = {
    pathParams: {
      id: agentId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetSingleAgentDetailsQuery(getSingleAgentDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  const getSingleDepartmentDetailsParameter = {
    pathParams: {
      id: departmentId,
    },
  };

  const departmentDetails = useGetSingleDepartmentDetailsQuery(
    getSingleDepartmentDetailsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!departmentId,
    },
  );

  const getPermissionsRoleByIdForAgentParameter = {
    pathParams: {
      roleId,
    },
  };

  const permissionRoleDetails = useGetPermissionsRoleByIdForAgentQuery(
    getPermissionsRoleByIdForAgentParameter,
    {
      skip: !roleId,
      refetchOnMountOrArgChange: true,
    },
  );

  const getAgentDetailLevelParameter = {
    queryParams: {
      agent: agentId,
    },
  };
  const agentLevelDetail = useGetAgentDetailLevelQuery(
    getAgentDetailLevelParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    isError,
    departmentDetails,
    isAgentModalOpen,
    setIsAgentModalOpen,
    permissionRoleDetails,
    agentLevelDetail,
  };
};
