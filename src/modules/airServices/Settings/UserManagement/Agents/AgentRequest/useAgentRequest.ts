import { useTheme } from '@mui/material';
import { useState } from 'react';
import {
  useGetAgentRequesterQuery,
  usePatchApprovedRequestMutation,
} from '@/services/airServices/settings/user-management/agents';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useAgentRequest = () => {
  const [openRejectedModal, setOpenRejectedModal] = useState(false);
  const [selectedAgentRequest, setSelectedAgentRequest] = useState('');

  const { data, isLoading, isFetching, isError }: any =
    useGetAgentRequesterQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const handleOpenModal = (agent: any) => {
    setSelectedAgentRequest(agent);
    setOpenRejectedModal?.(true);
  };

  const theme = useTheme();
  const [patchApprovedRequestTrigger, patchApprovedRequestStatus] =
    usePatchApprovedRequestMutation();

  const handlerStatusApprove = async (_id: any) => {
    const approvedRequestParams = new URLSearchParams();
    approvedRequestParams?.append('id', _id);
    const approvedRequestParameter = {
      queryParams: approvedRequestParams,
    };
    try {
      await patchApprovedRequestTrigger(approvedRequestParameter)?.unwrap();
      successSnackbar(`Request Approved successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    theme,
    handlerStatusApprove,
    openRejectedModal,
    setOpenRejectedModal,
    handleOpenModal,
    isLoading,
    isFetching,
    isError,
    data,
    patchApprovedRequestStatus,
    selectedAgentRequest,
    setSelectedAgentRequest,
  };
};
