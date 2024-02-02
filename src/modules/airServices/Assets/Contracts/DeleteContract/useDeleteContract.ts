import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteContractMutation } from '@/services/airServices/assets/contracts';

export const useDeleteContract = (props: any) => {
  const {
    setIsDeleteModalOpen,
    selectedContractList,
    setSelectedContractList,
    setPage,
  } = props;
  const [deleteContractTrigger, deleteContractStatus] =
    useDeleteContractMutation();

  const deleteContract = async () => {
    const deleteParams = new URLSearchParams();

    selectedContractList?.forEach(
      (contractId: any) => deleteParams?.append('ids', contractId),
    );

    const deleteContractParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteContractTrigger(deleteContractParameter)?.unwrap();
      setSelectedContractList([]);
      enqueueSnackbar('Record deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setPage?.(1);
      setIsDeleteModalOpen?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setSelectedContractList([]);
      setIsDeleteModalOpen?.(false);
    }
  };

  return {
    deleteContract,
    deleteContractStatus,
  };
};
