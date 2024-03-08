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
      setSelectedContractList([]);
      successSnackbar('Record deleted successfully');
      setPage?.(selectedContractList?.length === totalRecords ? 1 : page);
      const newPage = selectedContractList?.length === totalRecords ? 1 : page;
      await getContractListData?.(newPage);
      setIsDeleteModalOpen?.(false);
    } catch (error: any) {
      errorSnackbar();
      setSelectedContractList([]);
      setIsDeleteModalOpen?.(false);
    }
  };

  return {
    deleteContract,
    deleteContractStatus,
  };
};
