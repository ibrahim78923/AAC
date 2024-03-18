import { CONTRACT_STATUS } from '@/constants/strings';
import {
  useGetSingleContractByIdQuery,
  usePatchContractApproveMutation,
  usePatchContractRejectMutation,
  usePatchContractSubmitForApprovalMutation,
} from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const router = useRouter();
  const { contractId } = router?.query;
  const [patchContractSubmitApprovalTrigger] =
    usePatchContractSubmitForApprovalMutation();
  const [patchContractApproveTrigger] = usePatchContractApproveMutation();
  const [patchContractRejectTrigger] = usePatchContractRejectMutation();
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
  const handleSubmitForReject = async () => {
    const upDateRejectStatusData = { ...data };
    const upDateRejectedStatusData = { ...upDateRejectStatusData };
    const newData = {
      ...upDateRejectedStatusData?.data,
      status: CONTRACT_STATUS?.REJECTED,
    };
    upDateRejectedStatusData.data = newData;

    const putContractSubmitReject = {
      pathParam: { contractId },
      body: upDateRejectedStatusData,
    };

    try {
      await patchContractRejectTrigger(putContractSubmitReject)?.unwrap();
      successSnackbar('Contract was  Rejected');
    } catch (error) {
      errorSnackbar();
    }
  };
  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    handleSubmitForApproval,
    handleSubmitForApprove,
    handleSubmitForReject,
  };
};
