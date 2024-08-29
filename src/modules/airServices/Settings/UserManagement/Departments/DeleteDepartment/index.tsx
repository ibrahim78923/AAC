import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteDepartment } from './useDeleteDepartment';
import { IDepartmentsProps } from '../Departments.interface';

export const DeleteDepartment = (props: IDepartmentsProps) => {
  const { openDeleteModal } = props;
  const { handleDeleteSubmit, deleteDepartmentStatus, handleClose } =
    useDeleteDepartment(props);

  return (
    <AlertModals
      open={openDeleteModal as boolean}
      handleClose={() => handleClose?.()}
      handleSubmitBtn={handleDeleteSubmit}
      message="Are you sure you want to delete this Department?"
      type={ALERT_MODALS_TYPE?.DELETE}
      loading={deleteDepartmentStatus?.isLoading}
      disableCancelBtn={deleteDepartmentStatus?.isLoading}
    />
  );
};
