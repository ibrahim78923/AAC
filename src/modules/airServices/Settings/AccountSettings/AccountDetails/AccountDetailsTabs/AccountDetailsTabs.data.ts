import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import { IProfileDetail } from '../AccountDetails.interface';
import { Profile } from '../Profile';
import { ChangePassword } from '../ChangePassword';

export const getAccountDetailsTabsData = (profileDetail: IProfileDetail) => [
  {
    _id: 1,
    name: 'Profile',
    id: 'profile',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.EDIT_ACCOUNT_DETAILS,
    ],
    component: Profile,
    componentProps: {
      profileDetail,
    },
  },
  {
    _id: 2,
    name: 'Security',
    id: 'security',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.EDIT_ACCOUNT_DETAILS,
    ],
    component: ChangePassword,
  },
];
