import dynamic from 'next/dynamic';

const Rules = dynamic(() => import('./Rules'), {
  ssr: false,
});

const Tiers = dynamic(() => import('./Tiers'), {
  ssr: false,
});

export const loyaltyRulesAndTiersTabsDynamic = () => {
  return [
    {
      _id: 1,
      name: 'Tiers',
      component: Tiers,
    },
    {
      _id: 2,
      name: 'Rules',
      component: Rules,
    },
  ];
};
