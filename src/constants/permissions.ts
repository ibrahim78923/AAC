import { USER_MANAGEMENT_PERMISSIONS } from './permission-keys';

export const Permissions = {
  view_dashoard: ['view-dashboard'],
  user_management: [
    'user-list',
    USER_MANAGEMENT_PERMISSIONS.ADD_USER,
    USER_MANAGEMENT_PERMISSIONS.USER_SEARCH_AND_FILTER,
    USER_MANAGEMENT_PERMISSIONS.PLAN_MANAGEMENT,
  ],
  PLAN_MANAGMENT: ['add', 'user', 'user_box'],
};

{
  DASHBOARD: '/DASHBOARD';
}
