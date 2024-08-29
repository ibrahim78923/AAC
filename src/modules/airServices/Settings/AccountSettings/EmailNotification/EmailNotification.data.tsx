import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import { Tickets } from './Tickets';
import { Assets } from './Assets';
import { Contracts } from './Contracts';
import { Tasks } from './Tasks';
import { PurchaseOrders } from './PurchaseOrders';

export const emailNotificationDetailsTabData = [
  {
    _id: 1,
    name: 'Tickets',
    id: 'tickets',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_TICKETS_EMAIL_NOTIFICATION,
    ],
    component: Tickets,
  },
  {
    _id: 2,
    name: 'Assets',
    id: 'assets',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_ASSETS_EMAIL_NOTIFICATION,
    ],
    component: Assets,
  },
  {
    _id: 3,
    name: 'Contracts',
    id: 'contracts',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_CONTRACTS_EMAIL_NOTIFICATION,
    ],
    component: Contracts,
  },
  {
    _id: 4,
    name: 'Tasks',
    id: 'tasks',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_TASKS_EMAIL_NOTIFICATION,
    ],
    component: Tasks,
  },
  {
    _id: 5,
    name: 'PurchaseOrders',
    id: 'purchaseOrders',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_PURCHASE_ORDER_EMAIL_NOTIFICATION,
    ],
    component: PurchaseOrders,
  },
];
