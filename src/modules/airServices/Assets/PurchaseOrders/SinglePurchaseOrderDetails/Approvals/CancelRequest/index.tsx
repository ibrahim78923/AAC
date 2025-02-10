import { useCancelRequest } from './useCancelRequest';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

export const CancelRequest = ({ approvalId }: any) => {
  const { onCancel, patchRequestApprovalStatus } = useCancelRequest();

  return (
    <>
      <CustomLoadingButton
        primary={false}
        loading={patchRequestApprovalStatus?.isLoading}
        onClick={() => onCancel(approvalId)}
      >
        Cancel
      </CustomLoadingButton>
    </>
  );
};
