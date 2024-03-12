import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteAgent } from './useDeleteAgent';

export const DeleteAgent = (props: any) => {
  const { deleteModalOpen } = props;
  const { deleteAgent, closeAgentDeleteModal, deleteAgentStatus } =
    useDeleteAgent(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure want to delete this record?"
      open={deleteModalOpen}
      handleClose={() => closeAgentDeleteModal?.()}
      handleSubmitBtn={() => deleteAgent?.()}
      cancelBtnText="Cancel"
      loading={deleteAgentStatus?.isLoading}
      disableCancelBtn={deleteAgentStatus?.isLoading}
    />
  );
};
