import { CONTRACT_STATUS } from '@/constants/strings';
import {
  useGetSingleContractByIdQuery,
  usePatchContractApproveMutation,
  usePatchContractSubmitForApprovalMutation,
} from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useHeader = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { contractId } = router?.query;
  const [patchContractSubmitApprovalTrigger] =
    usePatchContractSubmitForApprovalMutation();
  const [patchContractApproveTrigger] = usePatchContractApproveMutation();

  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetSingleContractByIdQuery(getSingleContractParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    });
  const handleSubmitForApproval = async () => {
    const upDateStatusData = { ...data };
    const updatedStatusData = { ...upDateStatusData };
    const newData = {
      ...updatedStatusData?.data,
      status: CONTRACT_STATUS?.PENDING_APPROVAL,
    };
    updatedStatusData.data = newData;

    const putContractSubmitApproval = {
      pathParam: { contractId },
      body: updatedStatusData,
    };

    try {
      await patchContractSubmitApprovalTrigger(
        putContractSubmitApproval,
      )?.unwrap();
      successSnackbar('Contract was sent for Approval');
    } catch (error) {
      errorSnackbar();
    }
  };
  const handleSubmitForApprove = async () => {
    const upDateApprovesStatusData = { ...data };
    const upDateApproveStatusData = { ...upDateApprovesStatusData };
    const newData = {
      ...upDateApproveStatusData?.data,
      status: CONTRACT_STATUS?.APPROVED,
    };
    upDateApproveStatusData.data = newData;

    const putContractSubmitApprove = {
      pathParam: { contractId },
      body: upDateApproveStatusData,
    };

    try {
      await patchContractApproveTrigger(putContractSubmitApprove)?.unwrap();
      successSnackbar('Contract was  Approved');
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    handleClose,
    open,
    setOpen,
    data,
    isLoading,
    isFetching,
    isError,
    router,
    handleSubmitForApproval,
    handleSubmitForApprove,
    handleClickOpen,
  };
};
