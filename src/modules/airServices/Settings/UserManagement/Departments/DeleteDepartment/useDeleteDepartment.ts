import { useDeleteDepartmentMutation } from '@/services/airServices/settings/user-management/departments';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteDepartment = (props: any) => {
  const { setOpenDeleteModal, openDelete } = props;
  const [deleteDepartmentTrigger, deleteDepartmentStatus] =
    useDeleteDepartmentMutation();

  const handleDeleteSubmit = async () => {
    const deleteParams = new URLSearchParams();
    deleteParams?.append('id', openDelete?.item?._id);
    try {
      await deleteDepartmentTrigger(deleteParams)?.unwrap();
      successSnackbar('Department Delete Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleClose = () => {
    setOpenDeleteModal?.(false);
  };
  return {
    handleDeleteSubmit,
    deleteDepartmentStatus,
    handleClose,
  };
};
