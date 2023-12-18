import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useTeams } from '../Teams/useTeams';

export const AgentConversionDelete = ({ open, handleClose }: any) => {
  const { submitDeleteModal } = useTeams();
  return (
    <>
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
    </>
  );
};
