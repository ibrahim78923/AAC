import NoData from '@/components/NoData';
import RequestApprovalPage from './RequestApprovalPage';
import { Button } from '@mui/material';
import { PlusSharedColorIcon } from '@/assets/icons';
import { AddRequestApproval } from './AddRequestApproval';
import { useApprovals } from './useApprovals';
import { requestApprovalsData } from './Approvals.data';
import { RequestConfirmForm } from './RequestConfirmForm';

export const Approvals = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    updateRequestApprovalStatus,
  } = useApprovals();
  return (
    <>
      <br />
      {!!requestApprovalsData?.length ? (
        <RequestApprovalPage
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={requestApprovalsData}
          selectedApproval={selectedApproval}
          setSelectedApproval={setSelectedApproval}
          setApproval={(item: any) => setApproval?.(item)}
          updateRequestApprovalStatus={(item: any) =>
            updateRequestApprovalStatus?.(item)
          }
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
