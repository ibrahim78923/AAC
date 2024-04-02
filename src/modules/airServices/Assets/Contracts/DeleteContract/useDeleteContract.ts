import { useDeleteContractMutation } from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteContract = (props: any) => {
  const {
    setIsDeleteModalOpen,
    selectedContractList,
    setSelectedContractList,
    setPage,
    totalRecords,
    page,
    getContractListData,
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
      successSnackbar('Record deleted successfully');
      setSelectedContractList?.([]);
      setIsDeleteModalOpen?.(false);
      const newPage = selectedContractList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getContractListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    deleteContract,
    deleteContractStatus,
  };
};
