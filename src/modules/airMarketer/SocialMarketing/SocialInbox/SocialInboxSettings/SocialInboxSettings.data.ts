import RolesRight from './TabsData/RolesAndRight';
import UserManagement from './TabsData/UserManagement';
import Notification from './TabsData/Notification';
import LifeCycleStage from './TabsData/LifecycleStage';
import SocialAccounts from './TabsData/SocialAccounts';

export const tabLabels = [
  'Lifecycle Stages',
  'Social Accounts',
  'Roles and Rights',
  'User Management',
  'Notifications',
];

export const tabComponents = [
  LifeCycleStage,
  SocialAccounts,
  RolesRight,
  UserManagement,
  Notification,
];
