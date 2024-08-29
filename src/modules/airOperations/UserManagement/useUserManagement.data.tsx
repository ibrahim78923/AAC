import { Permissions } from '@/constants/permissions';
import { Teams } from './Teams';
import { User } from './User';

export const userManagementTabsDataDynamic = () => {
  return [
    {
      _id: 1,
      name: 'User',
      id: 'user',
      tabPermissions:
        Permissions?.AIR_OPERATIONS_USER_MANAGEMENT_USERS_VIEW_DETAILS,
      component: User,
    },
    {
      _id: 2,
      name: 'Teams',
      id: 'teams',
      tabPermissions:
        Permissions?.AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_VIEW_DETAILS,
      component: Teams,
    },
  ];
};
