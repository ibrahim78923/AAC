import { useTheme } from '@mui/material';
import { useState } from 'react';
import {
  useGetAgentRequesterQuery,
  usePatchApprovedRequestMutation,
} from '@/services/airServices/settings/user-management/agents';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAgentRequest = () => {
  const [openRejectedModal, setOpenRejectedModal] = useState({
    val: false,
    id: null,
  });
  const session: any = window?.localStorage?.getItem('session');
  const companyId = JSON?.parse(session)?.user?._id;
  const { data } = useGetAgentRequesterQuery(companyId);
  const requesterData = data?.data;
  const userDetails = requesterData?.map((item: any) => item?.userDetails);

  const handleOpenModal = (_id: any) => {
    setOpenRejectedModal({ val: true, id: _id });
  };

  const theme = useTheme();
  const [patchTrigger] = usePatchApprovedRequestMutation();
  const handlerStatusApprove = async (_id: any) => {
    const approvedRequestParams = new URLSearchParams();
    approvedRequestParams?.append('id', _id);
    approvedRequestParams?.append('companyId', companyId);
    const approvedRequestParameter = {
      queryParams: approvedRequestParams,
    };
    try {
      await patchTrigger(approvedRequestParameter)?.unwrap();
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
  };
};
