import { Header } from './Header';
import { loyaltyRulesAndTiersTabsDynamic } from './RulesAndTiers.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const RulesAndTiers = () => {
  const loyaltyRulesAndTiersTabs = loyaltyRulesAndTiersTabsDynamic?.();
  return (
    <>
      <Header />
      <br />
      <PermissionsTabs tabsDataArray={loyaltyRulesAndTiersTabs} />
    </>
  );
};
