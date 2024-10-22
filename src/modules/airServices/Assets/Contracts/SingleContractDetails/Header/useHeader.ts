import { CONTRACT_STATUS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useGetSingleContractByIdQuery,
  usePatchContractApproveMutation,
  usePatchContractSubmitForApprovalMutation,
} from '@/services/airServices/assets/contracts';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useHeader = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { user }: any = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { contractId } = router?.query;

  const [
    patchContractSubmitApprovalTrigger,
    patchContractSubmitApprovalProcess,
  ] = usePatchContractSubmitForApprovalMutation();
  const [patchContractApproveTrigger, patchContractApproveProcess] =
    usePatchContractApproveMutation();

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
    try {
      await patchContractSubmitApprovalTrigger({
        contractId,
        statusApproval: CONTRACT_STATUS?.PENDING_APPROVAL,
      })?.unwrap();
      successSnackbar('Contract was sent for Approval');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    user,
    patchContractSubmitApprovalProcess,
    patchContractApproveProcess,
  };
};
