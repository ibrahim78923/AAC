import { Rules } from './Rules';
import { Tiers } from './Tiers';

export const loyaltyRulesAndTiersTabsDynamic = () => {
  return [
    {
      _id: 1,
      name: 'Tiers',
      id: 'tiers',
      tabPermissions: [],
      component: Tiers,
      hasNoPermissions: true,
      componentProps: {},
    },
    {
      _id: 2,
      name: 'Rules',
      id: 'rules',
      tabPermissions: [],
      component: Rules,
      hasNoPermissions: true,
      componentProps: {},
    },
  ];
};
