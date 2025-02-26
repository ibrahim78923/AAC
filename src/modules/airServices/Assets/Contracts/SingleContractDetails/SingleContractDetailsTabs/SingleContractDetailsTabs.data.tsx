import { Overview } from '../Overview';
import { AssetsAssociate } from '../AssetsAssociate';
import { ContractHistory } from '../ContractHistory';
import { Activity } from '../Activity';
import { Attachment } from '../Attachment';
import { CONTRACT_TYPES } from '@/constants/services';

export const singleContractDetailTabsDataDynamic = (contractType: string) => [
  {
    _id: 1,
    name: 'Overview',
    component: Overview,
  },
  ...(contractType === CONTRACT_TYPES?.SOFTWARE_LICENSE
    ? [
        {
          _id: 2,
          name: 'Assets Associates',
          component: AssetsAssociate,
        },
      ]
    : []),

  {
    _id: 3,
    name: 'Contract History',
    component: ContractHistory,
  },
  {
    _id: 4,
    name: 'Activity',
    component: Activity,
  },
  {
    _id: 5,
    name: 'Attachments',
    component: Attachment,
  },
];
