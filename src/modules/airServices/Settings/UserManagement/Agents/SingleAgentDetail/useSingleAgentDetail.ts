import {
  useGetSingleAgentDetailsQuery,
  useGetSingleDepartmentDetailsQuery,
} from '@/services/airServices/settings/user-management/agents/details';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSingleAgentDetail = () => {
  const router = useRouter();
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const { agentId, departmentId } = router?.query;
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

  return {
    data,
    isLoading,
    isFetching,
    isError,
    departmentDetails,
    isAgentModalOpen,
    setIsAgentModalOpen,
  };
};
