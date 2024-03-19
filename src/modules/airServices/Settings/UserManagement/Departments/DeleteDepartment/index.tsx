import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteDepartment } from './useDeleteDepartment';

export const DeleteDepartment = (props: any) => {
  const { openDeleteModal } = props;
  const { handleDeleteSubmit, deleteDepartmentStatus, handleClose } =
    useDeleteDepartment(props);
  return (
    <AlertModals
      open={openDeleteModal}
      handleClose={() => handleClose?.()}
      handleSubmitBtn={handleDeleteSubmit}
      message="Are you sure you want to delete this Department?"
      type={ALERT_MODALS_TYPE?.DELETE}
      loading={deleteDepartmentStatus?.isLoading}
    />
  );
};
