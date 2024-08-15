import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { AllApprovals } from './AllApprovals';
import RequestApproval from './RequestApproval';
import RequestReceivedApproval from './RequestReceivedApproval';

export const singleTicketDetailApprovalsTabsDynamic = (props: any) => {
  const { setApproval, updateRequestApprovalStatus } = props;
  return [
    {
      _id: 1,
      name: 'All',
      id: 'all',
      tabPermissions: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
      component: AllApprovals,
      componentProps: {
        setApproval: (item: any) => setApproval?.(item),
        updateRequestApprovalStatus: (item: any) =>
          updateRequestApprovalStatus?.(item),
      },
    },
    {
      _id: 2,
      name: 'Request sent for approval',
      id: 'request_sent_for_approval',
      tabPermissions: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
      component: RequestApproval,
      componentProps: {
        setApproval: (item: any) => setApproval?.(item),
        updateRequestApprovalStatus: (item: any) =>
          updateRequestApprovalStatus?.(item),
      },
    },
    {
      _id: 3,
      name: 'Request received for approval',
      id: 'request_received_for_approval',
      tabPermissions: [AIR_SERVICES_TICKETS_TICKET_LISTS?.VIEW_TICKETS_DETAILS],
      component: RequestReceivedApproval,
      componentProps: {
        setApproval: (item: any) => setApproval?.(item),
        updateRequestApprovalStatus: (item: any) =>
          updateRequestApprovalStatus?.(item),
      },
    },
  ];
};
