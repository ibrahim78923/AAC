import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useAgentConversionDelete } from './useAgentConversionDelete';

export const AgentConversionDelete = ({ open, handleClose }: any) => {
  const { submitDeleteModal } = useAgentConversionDelete();
  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this Requester?"
      open={open}
      handleClose={handleClose}
      handleSubmitBtn={() => {
        submitDeleteModal();
        handleClose();
      }}
    />
  );
};
