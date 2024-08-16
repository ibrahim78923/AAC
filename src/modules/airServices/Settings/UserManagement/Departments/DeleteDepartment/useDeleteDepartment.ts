import { useDeleteDepartmentMutation } from '@/services/airServices/settings/user-management/departments';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IDepartmentsProps, IErrorResponse } from '../Departments.interface';

export const useDeleteDepartment = (props: IDepartmentsProps) => {
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
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
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
