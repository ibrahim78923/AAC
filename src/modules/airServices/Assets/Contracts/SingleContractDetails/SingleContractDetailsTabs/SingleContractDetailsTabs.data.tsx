import { CONTRACT_TYPES } from '@/constants/strings';

export const singleContractDetailTabsData = (data: any) => {
  if (data?.data?.contractType === CONTRACT_TYPES?.SOFTWARE_LICENSE)
    return ['Overview', 'Contract History', 'Activity', 'Attachment'];
  return [
    'Overview',
    'Assets Associates',
    'Contract History',
    'Activity',
    'Attachment',
  ];
};
