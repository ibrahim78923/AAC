import { useFormLib } from '@/hooks/useFormLib';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useAllocateContractMutation } from '@/services/airServices/assets/software/single-software-detail/users';
import {
  contractAllocationFormDefaultValues,
  contractAllocationFormValidationSchema,
} from './AllocateContract.data';
import { ARRAY_INDEX } from '@/constants/strings';

export const useAllocateContract = (props: any) => {
  const { setUsersData, setIsPortalOpen, usersData } = props;
  const [userAllocateTrigger, { isLoading }] = useAllocateContractMutation();

  const useFormValues = {
    validationSchema: contractAllocationFormValidationSchema,
    defaultValues: contractAllocationFormDefaultValues,
  };

  const { methods, handleSubmit } = useFormLib(useFormValues);

  const closeModal = () => {
    setIsPortalOpen?.({});
    setUsersData?.([]);
  };

  const allocateContractSubmit = async (formData: any) => {
    const allocateParams = {
      id: usersData?.[ARRAY_INDEX?.ZERO]?._id,
      contractId: formData?.contract?._id,
    };
    try {
      await userAllocateTrigger(allocateParams)?.unwrap();
      successSnackbar('Contract allocated successfully');
      closeModal();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    allocateContractSubmit,
    closeModal,
    isLoading,
    methods,
    handleSubmit,
  };
};
