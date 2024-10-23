import { AllSurveys } from './AllSurveys';
import { Published } from './Published';
import { Draft } from './Draft';
import { Inactive } from './Inactive';

export const customerSupportTabsData = [
  {
    _id: 1,
    name: 'All Surveys',
    id: 'all_survey',
    tabPermissions: [],
    component: AllSurveys,
    componentProps: {},
    hasNoPermissions: true,
  },
  {
    _id: 2,
    name: 'Published',
    id: 'published',
    tabPermissions: [],
    component: Published,
    componentProps: {},
    hasNoPermissions: true,
  },
  {
    _id: 3,
    name: 'Draft',
    id: 'draft',
    tabPermissions: [],
    component: Draft,
    componentProps: {},
    hasNoPermissions: true,
  },
  {
    _id: 4,
    name: 'Inactive',
    id: 'inactive',
    tabPermissions: [],
    component: Inactive,
    componentProps: {},
    hasNoPermissions: true,
  },
];
