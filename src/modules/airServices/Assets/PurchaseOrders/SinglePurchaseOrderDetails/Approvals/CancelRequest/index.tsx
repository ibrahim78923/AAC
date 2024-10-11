import { LoadingButton } from '@mui/lab';
import { useCancelRequest } from './useCancelRequest';

export const CancelRequest = ({ approvalId }: any) => {
  const { onCancel, patchRequestApprovalStatus } = useCancelRequest();

  return (
    <>
      <LoadingButton
        variant="outlined"
        color="secondary"
        className={'small'}
        loading={patchRequestApprovalStatus?.isLoading}
        onClick={() => onCancel(approvalId)}
      >
        Cancel
      </LoadingButton>
    </>
  );
};
