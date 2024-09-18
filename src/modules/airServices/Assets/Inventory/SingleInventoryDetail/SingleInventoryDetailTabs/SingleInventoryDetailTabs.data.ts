import { Associations } from '../Associations';
import { PurchaseOrder } from '../PurchaseOrders';
import { Contract } from '../Contract';
import { Expense } from '../Expense';
import { Activity } from '../Activity';
import { Software } from '../Software';
import { Attachment } from '../Attachment';
import { Overview } from '../Overview';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const singleInventoryDetailTabsData = [
  {
    _id: 1,
    id: 'overview',
    name: 'Overview',
    tabPermissions: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.OVERVIEW],
    component: Overview,
  },
  {
    _id: 2,
    id: 'associations',
    name: 'Associations',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ASSOCIATION,
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
    ],
    component: Associations,
  },
  {
    _id: 3,
    id: 'purchaseOrders',
    name: 'Purchase Orders',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_PURCHASE_ORDER,
    ],
    component: PurchaseOrder,
  },
  {
    _id: 4,
    id: 'contracts',
    name: 'Contracts',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_CONTRACTS,
    ],
    component: Contract,
  },
  {
    _id: 5,
    id: 'expenses',
    name: 'Expenses',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EXPENSE_LIST_VIEW,
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_NEW_EXPENSE,
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EXPENSE_LIST_VIEW,
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.DELETE_EXPENSE,
    ],
    component: Expense,
  },
  {
    _id: 6,
    id: 'activity',
    name: 'Activity',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ACTIVITIES,
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EXPORT_ACTIVITIES,
    ],
    component: Activity,
  },
  {
    _id: 7,
    id: 'software',
    name: 'Software',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RELATED_SOFTWARES,
    ],
    component: Software,
  },
  {
    _id: 8,
    id: 'attachments',
    name: 'Attachments',
    tabPermissions: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ATTACHMENTS,
    ],
    component: Attachment,
  },
];
