import { AlertModals } from '@/components/AlertModals';
import { useDeleteContract } from './useDeleteContract';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteContract = (props: any) => {
  const { setIsDeleteModalOpen, isDeleteModalOpen } = props;
  const { deleteContract } = useDeleteContract(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete the selected contract?"
      open={isDeleteModalOpen}
      handleClose={() => setIsDeleteModalOpen?.(false)}
      handleSubmitBtn={() => deleteContract?.()}
      cancelBtnText="Cancel"
    />
  );
};
