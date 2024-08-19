import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteAgent } from './useDeleteAgent';
import { IAgentsProps } from '../Agents.interface';

export const DeleteAgent = (props: IAgentsProps) => {
  const { openDeleteModal } = props;
  const { deleteAgent, closeAgentDeleteModal, deleteAgentStatus } =
    useDeleteAgent(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure want to delete this record?"
      open={openDeleteModal as boolean}
      handleClose={() => closeAgentDeleteModal?.()}
      handleSubmitBtn={() => deleteAgent?.()}
      cancelBtnText="Cancel"
      loading={deleteAgentStatus?.isLoading}
      disableCancelBtn={deleteAgentStatus?.isLoading}
    />
  );
};
