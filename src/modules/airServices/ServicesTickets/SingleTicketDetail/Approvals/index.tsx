import AddRequestPage from './AddRequestPage';
import RequestApprovalPage from './RequestApprovalPage';
import { ApprovalData } from './RequestApprovalPage/AllApprovals.data';

export const Approvals = () => {
  return (
    <>{ApprovalData?.length ? <RequestApprovalPage /> : <AddRequestPage />}</>
  );
};
