import { Box, Button, Skeleton } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { useHeader } from './useHeader';
import { CONTRACT_STATUS } from '@/constants/strings';
import { RejectStatus } from './RejectStatus';

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
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSubmitForApproval}
              type="submit"
            >
              Submit For Approval
            </Button>
          )}
          {data?.data?.status === CONTRACT_STATUS?.PENDING_APPROVAL && (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSubmitForApprove}
              >
                approve
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
              >
                Reject
              </Button>
            </>
          )}

          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
      <RejectStatus open={open} handleClose={handleClose} data={data} />
    </>
  );
};
