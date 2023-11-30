import AddRequestPage from './AddRequestPage';
import RequestApprovalPage from './RequestApprovalPage';
import { requestApprovalPageData } from './RequestApprovalPage/RequestApprovalPage.data';

export const Approvals = () => {
  return (
    <>
      {requestApprovalPageData?.length ? (
        <RequestApprovalPage />
      ) : (
        <AddRequestPage />
      )}
    </>
  );
};
