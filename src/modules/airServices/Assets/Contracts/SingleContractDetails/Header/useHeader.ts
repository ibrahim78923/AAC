import { CONTRACT_STATUS } from '@/constants/strings';
import {
  useGetSingleContractByIdQuery,
  usePatchContractSubmitForApprovalMutation,
} from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const router = useRouter();
  const { contractId } = router?.query;
  const [patchContractSubmitApprovalTrigger] =
    usePatchContractSubmitForApprovalMutation();
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
      ...updatedStatusData.data,
      status: CONTRACT_STATUS.PENDING_APPROVAL,
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

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    handleSubmitForApproval,
  };
};
