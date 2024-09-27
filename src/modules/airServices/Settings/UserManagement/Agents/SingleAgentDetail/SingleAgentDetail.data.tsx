import { Tickets } from './Tickets';
import { Tasks } from './Tasks';
import { Assets } from './Assets';
import { Software } from './Software';

export const getSingleAgentsTabsData = [
  {
    _id: 1,
    name: 'Tickets',
    id: 'tickets',
    tabPermissions: [],
    hasNoPermissions: true,
    component: Tickets,
  },
  {
    _id: 2,
    name: 'Tasks',
    id: 'tasks',
    component: Tasks,
    tabPermissions: [],
    hasNoPermissions: true,
  },
  {
    _id: 3,
    name: 'Assets',
    id: 'assets',
    component: Assets,
    tabPermissions: [],
    hasNoPermissions: true,
  },
  {
    _id: 4,
    name: 'Software',
    id: 'software',
    component: Software,
    tabPermissions: [],
    hasNoPermissions: true,
  },
];
