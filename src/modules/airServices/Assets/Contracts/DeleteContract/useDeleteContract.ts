import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteContractMutation } from '@/services/airServices/assets/contracts';

export const useDeleteContract = (props: any) => {
  const {
    setIsDeleteModalOpen,
    selectedContractList,
    setSelectedContractList,
  } = props;
  const [deleteContractTrigger] = useDeleteContractMutation();

  const deleteContract = async () => {
    const deleteParams = new URLSearchParams();

    selectedContractList?.forEach(
      (contractId: any) => deleteParams?.append('ids', contractId),
    );

    const deleteContractParameter = {
      queryParams: deleteParams,
    };

    try {
      const response: any = await deleteContractTrigger(
        deleteContractParameter,
      )?.unwrap();
      setSelectedContractList([]);
      enqueueSnackbar(response?.message ?? 'Record delete successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDeleteModalOpen?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Record not delete', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setSelectedContractList([]);
      setIsDeleteModalOpen?.(false);
    }
  };

  return {
    deleteContract,
  };
};
