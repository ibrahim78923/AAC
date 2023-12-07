import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useAgentConversionWarning } from './useAgentConversionWarning';
import ErrorIcon from '@mui/icons-material/Error';

export const AgentConversionWarning = ({ open, handleClose }: any) => {
  const { submitWarningModal } = useAgentConversionWarning();
  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.WARNING}
      message="Enee Well will be converted to agent.Are you sure you want to proceed?"
      open={open}
      typeImage={<ErrorIcon sx={{ color: 'warning.main' }} />}
      handleClose={handleClose}
      handleSubmitBtn={() => {
        submitWarningModal();
        handleClose();
      }}
    />
  );
};
