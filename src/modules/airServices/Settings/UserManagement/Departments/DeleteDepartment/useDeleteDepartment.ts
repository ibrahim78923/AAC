import { useDeleteDepartmentMutation } from '@/services/airServices/settings/user-management/departments';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteDepartment = (props: any) => {
  const {
    setOpenDeleteModal,
    setSelectedDepartment,
    selectedDepartment,
    getDepartmentListData,
    setPage,
    totalRecords,
    page,
  } = props;

  const [deleteDepartmentTrigger, deleteDepartmentStatus] =
    useDeleteDepartmentMutation();

  const handleDeleteSubmit = async () => {
    const deleteParams = { id: selectedDepartment?._id };

    try {
      await deleteDepartmentTrigger(deleteParams)?.unwrap();
      successSnackbar('Department Delete Successfully');
      const newPage = totalRecords === 1 ? 1 : page;
      setPage?.(newPage);
      await getDepartmentListData?.(newPage);
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setOpenDeleteModal?.(false);
    setSelectedDepartment?.('');
  };

  return {
    handleDeleteSubmit,
    deleteDepartmentStatus,
    handleClose,
  };
};
