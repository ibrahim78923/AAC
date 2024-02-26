import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import React from 'react';
import { ApprovalsTabsData } from './useApprovalsTabs.data';
import AllApprovals from '../AllApprovals';
import PendingForApprovals from '../PendingForApprovals';

const ApprovalsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={ApprovalsTabsData}>
      <AllApprovals />
      <PendingForApprovals />
    </HorizontalTabs>
  );
};

export default ApprovalsTabs;
