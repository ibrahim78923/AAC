import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useConvertToAgent } from './useConvertToAgent';
import ErrorIcon from '@mui/icons-material/Error';
import { fullName } from '@/utils/avatarUtils';

export const ConvertToAgent = (props: any) => {
  const { isAgentConvert, selectedRequesterList } = props;
  const {
    ConvertToAgentRequester,
    closeRequesterConvertToAgentModal,
    convertToAgentStatus,
  } = useConvertToAgent(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.WARNING}
      message={`${fullName(
        selectedRequesterList?.[0]?.firstName,
        selectedRequesterList?.[0]?.lastName,
      )} will be converted to agent.Are you sure you want to proceed?`}
      open={isAgentConvert}
      typeImage={<ErrorIcon sx={{ color: 'warning.main' }} />}
      handleClose={() => closeRequesterConvertToAgentModal?.()}
      handleSubmitBtn={() => ConvertToAgentRequester?.()}
      loading={convertToAgentStatus?.isLoading}
      disableCancelBtn={convertToAgentStatus?.isLoading}
    />
  );
};
