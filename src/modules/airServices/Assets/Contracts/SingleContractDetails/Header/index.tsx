import { Box, Skeleton } from '@mui/material';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useHeader } from './useHeader';
import { RejectStatus } from './RejectStatus';
import { AIR_SERVICES } from '@/constants/routes';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';
import { CONTRACT_STATUS } from '@/constants/services';

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
            <CustomLoadingButton
              primary={false}
              onClick={handleSubmitForApproval}
              type="submit"
              loading={patchContractSubmitApprovalProcess?.isLoading}
            >
              Submit For Approval
            </CustomLoadingButton>
          )}
          {data?.data?.status === CONTRACT_STATUS?.PENDING_APPROVAL &&
            data?.data?.approver?._id === user?._id && (
              <>
                <CustomLoadingButton
                  primary={false}
                  onClick={handleSubmitForApprove}
                  loading={patchContractApproveProcess?.isLoading}
                >
                  approve
                </CustomLoadingButton>
                <CustomLoadingButton
                  primary={false}
                  onClick={handleClickOpen}
                  disabled={patchContractApproveProcess?.isLoading}
                >
                  Reject
                </CustomLoadingButton>
              </>
            )}

          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
      {open && (
        <RejectStatus open={open} handleClose={handleClose} data={data} />
      )}
    </>
  );
};
