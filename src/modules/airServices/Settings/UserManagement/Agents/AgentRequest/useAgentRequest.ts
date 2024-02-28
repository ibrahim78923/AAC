import { useTheme } from '@mui/material';
import { useState } from 'react';
import {
  useGetAgentRequesterQuery,
  usePatchApprovedRequestMutation,
} from '@/services/airServices/settings/user-management/agents';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAgentRequest = () => {
  const [openRejectedModal, setOpenRejectedModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(null);
  const companyId = '651e6368a3a6baf2f193efb3';
  const { data } = useGetAgentRequesterQuery(companyId);
  const requesterData = data?.data;
  const userDetails = requesterData?.map((item: any) => item?.userDetails);

  const handleOpenModal = (_id: any) => {
    setSelectedId(_id);
    setOpenRejectedModal(true);
  };
  const theme = useTheme();
  const [patchTrigger] = usePatchApprovedRequestMutation();
  const handlerStatusApprove = async (_id: any) => {
    try {
      await patchTrigger({
        id: _id,
        companyId,
      });
      successSnackbar(`Request Approved successfully`);
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    theme,
    handlerStatusApprove,
    openRejectedModal,
    setOpenRejectedModal,
    handleOpenModal,
    userDetails,
    requesterData,
    selectedId,
  };
};
