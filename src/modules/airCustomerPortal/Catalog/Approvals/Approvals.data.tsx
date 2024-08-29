import { TICKET_APPROVALS } from '@/constants/strings';
import AllApprovals from './AllApprovals';

export const catalogApprovalsTabsDataDynamic = () => {
  return [
    {
      _id: 1,
      name: 'All',
      id: 'all',
      tabPermissions: [],
      component: AllApprovals,
      componentProps: {
        approvalStatus: TICKET_APPROVALS?.ALL,
      },
      hasNoPermissions: true,
    },
    {
      _id: 2,
      name: 'Pending For Approvals',
      id: 'pending_for_approvals',
      tabPermissions: [],
      component: AllApprovals,
      componentProps: {
        approvalStatus: TICKET_APPROVALS?.RECEIVED,
      },
      hasNoPermissions: true,
    },
  ];
};
