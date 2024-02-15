import NoData from '@/components/NoData';
import RequestApprovalPage from './RequestApprovalPage';
import { Button } from '@mui/material';
import { PlusSharedColorIcon } from '@/assets/icons';
import { AddRequestApproval } from './AddRequestApproval';
import { useApprovals } from './useApprovals';
import { RequestConfirmForm } from './RequestConfirmForm';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const Approvals = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    data,
    isLoading,
    isFetching,
    updateRequestApprovalStatus,
    isError,
  } = useApprovals();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <>
      <br />
      {!!data?.data?.length ? (
        <RequestApprovalPage
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          selectedApproval={selectedApproval}
          setSelectedApproval={setSelectedApproval}
          setApproval={(item: any) => setApproval?.(item)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
          data={data?.data}
          metaData={{ isLoading, isFetching, isError }}
        />
      ) : (
        <NoData message="No approvals found">
          <Button
            variant="contained"
            onClick={() => setIsDrawerOpen(true)}
            startIcon={<PlusSharedColorIcon />}
          >
            Request Approval
          </Button>
        </NoData>
      )}
      <AddRequestApproval
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <RequestConfirmForm
        isConfirmModalOpen={isConfirmModalOpen}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        selectedApproval={selectedApproval}
        setSelectedApproval={setSelectedApproval}
      />
    </>
  );
};
