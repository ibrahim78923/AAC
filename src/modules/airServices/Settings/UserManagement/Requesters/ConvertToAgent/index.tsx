import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE, ARRAY_INDEX } from '@/constants/strings';
import { useConvertToAgent } from './useConvertToAgent';
import ErrorIcon from '@mui/icons-material/Error';
import { fullName } from '@/utils/avatarUtils';
import { IRequestersProps } from '../Requesters.interface';

export const ConvertToAgent = (props: IRequestersProps) => {
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
        selectedRequesterList?.[ARRAY_INDEX?.ZERO]?.firstName,
        selectedRequesterList?.[ARRAY_INDEX?.ZERO]?.lastName,
      )} will be converted to agent.Are you sure you want to proceed?`}
      open={isAgentConvert as boolean}
      typeImage={<ErrorIcon sx={{ color: 'warning.main' }} />}
      handleClose={() => closeRequesterConvertToAgentModal?.()}
      handleSubmitBtn={() => ConvertToAgentRequester?.()}
      loading={convertToAgentStatus?.isLoading}
      disableCancelBtn={convertToAgentStatus?.isLoading}
    />
  );
};
