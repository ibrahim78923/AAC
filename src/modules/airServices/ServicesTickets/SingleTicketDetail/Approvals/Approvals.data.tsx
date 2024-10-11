import { TICKET_APPROVALS } from '@/constants/strings';
import { AllApprovals } from './AllApprovals';

const { ALL, REQUESTED, RECEIVED } = TICKET_APPROVALS;

export const TAB_CHANGED_FILTERED: any = {
  0: ALL,
  1: REQUESTED,
  2: RECEIVED,
};

export const singleTicketDetailApprovalsTabsDynamic = () => {
  return [
    {
      _id: 1,
      name: 'All',
      id: 'all',
      tabPermissions: [],
      component: AllApprovals,
      hasNoPermissions: true,
      componentProps: {},
    },
    {
      _id: 2,
      name: 'Request sent for approval',
      id: 'request_sent_for_approval',
      tabPermissions: [],
      component: AllApprovals,
      hasNoPermissions: true,
      componentProps: {},
    },
    {
      _id: 3,
      name: 'Request received for approval',
      id: 'request_received_for_approval',
      hasNoPermissions: true,
      tabPermissions: [],
      component: AllApprovals,
      componentProps: {},
    },
  ];
};
