import { Overview } from '../Overview';
import { Installations } from '../Installations';
import { Users } from '../Users';
import { Contracts } from '../Contracts';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';

export const softwareTabsData = [
  {
    _id: 1,
    id: 'overview',
    name: 'Overview',
    tabPermissions: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.OVERVIEW],
    componentProps: {},
    component: Overview,
  },
  {
    _id: 2,
    id: 'installations',
    name: 'Installations',
    tabPermissions: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.INSTALLATIONS],
    componentProps: {},
    component: Installations,
  },
  {
    _id: 3,
    id: 'users',
    name: 'Users',
    tabPermissions: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.USERS],
    componentProps: {},
    component: Users,
  },
  {
    _id: 4,
    id: 'contracts',
    name: 'Contracts',
    tabPermissions: [AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.CONTRACTS],
    componentProps: {},
    component: Contracts,
  },
];
