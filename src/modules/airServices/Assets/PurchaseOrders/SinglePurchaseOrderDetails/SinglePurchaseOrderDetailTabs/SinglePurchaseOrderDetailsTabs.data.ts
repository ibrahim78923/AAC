import { Approvals } from '../Approvals';
import { Associations } from '../Associations';
import { AssetsReceived } from '../AssetsReceived';
import { Attachment } from '../Attachments';
import { Overview } from '../Overview';

export const singlePurchaseOrderDetailTabsData = [
  {
    _id: 1,
    id: 'overview',
    name: 'Overview',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Overview,
  },
  {
    _id: 2,
    id: 'approvals',
    name: 'Approvals',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Approvals,
  },
  {
    _id: 3,
    id: 'associations',
    name: 'Associations',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Associations,
  },
  {
    _id: 4,
    id: 'assetsReceived',
    name: 'Assets Received',
    tabPermissions: [],
    hasNoPermissions: true,
    component: AssetsReceived,
  },
  {
    _id: 5,
    id: 'Attachment',
    name: 'Attachment',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Attachment,
  },
];
