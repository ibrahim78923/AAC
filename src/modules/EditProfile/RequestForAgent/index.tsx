import { AlertModals } from '@/components/AlertModals';
import { useRequestForAgent } from './useRequestForAgent';
import { RequestForAgentI } from './RequestForAgent.interface';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { Error } from '@mui/icons-material';

export const RequestForAgent = (props: RequestForAgentI) => {
  const {
    handleRequestAgent,
    requestAgentLoading,
    openRequestAgentModal,
    handleClose,
  } = useRequestForAgent(props);
  return (
    <AlertModals
      open={openRequestAgentModal}
      handleClose={handleClose}
      handleSubmitBtn={handleRequestAgent}
      type={ALERT_MODALS_TYPE?.WARNING}
      typeImage={<Error sx={{ color: 'warning.main' }} />}
      loading={requestAgentLoading}
      disableCancelBtn={requestAgentLoading}
      message="You will be converted to agent. Are you sure you want to proceed?"
    />
  );
};
