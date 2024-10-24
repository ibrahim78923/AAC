import { Box, Skeleton } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useHeader } from './useHeader';
import { CONTRACT_STATUS } from '@/constants/strings';
import { RejectStatus } from './RejectStatus';
import { LoadingButton } from '@mui/lab';
import { AIR_SERVICES } from '@/constants/routes';

export const Header = (props: any) => {
  const { dropdownOptions } = props;
  const {
    handleClose,
    open,
    data,
    isLoading,
    isFetching,
    router,
    handleSubmitForApproval,
    handleSubmitForApprove,
    handleClickOpen,
    user,
    patchContractSubmitApprovalProcess,
    patchContractApproveProcess,
  } = useHeader();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <PageTitledHeader
          moveBack={() =>
            router?.push({
              pathname: AIR_SERVICES?.ASSETS_CONTRACTS,
            })
          }
          canMovedBack
          title={data?.data?.name}
        />
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          {data?.data?.status === CONTRACT_STATUS?.DRAFT && (
            <LoadingButton
              variant="outlined"
              color="secondary"
              onClick={handleSubmitForApproval}
              type="submit"
              className="small"
              loading={patchContractSubmitApprovalProcess?.isLoading}
            >
              Submit For Approval
            </LoadingButton>
          )}
          {data?.data?.status === CONTRACT_STATUS?.PENDING_APPROVAL &&
            data?.data?.approver?._id === user?._id && (
              <>
                <LoadingButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleSubmitForApprove}
                  className="small"
                  loading={patchContractApproveProcess?.isLoading}
                >
                  approve
                </LoadingButton>
                <LoadingButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleClickOpen}
                  className="small"
                  disabled={patchContractApproveProcess?.isLoading}
                >
                  Reject
                </LoadingButton>
              </>
            )}

          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
      <RejectStatus open={open} handleClose={handleClose} data={data} />
    </>
  );
};
