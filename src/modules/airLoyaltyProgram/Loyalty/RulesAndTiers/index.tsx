import { Header } from './Header';
import { loyaltyRulesAndTierstabsDynamic } from './RulesAndTiers.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const RulesAndTiers = () => {
  const loyaltyRulesAndTierstabs = loyaltyRulesAndTierstabsDynamic?.();
  return (
    <>
      <Header />
      <br />
      <PermissionsTabs tabsDataArray={loyaltyRulesAndTierstabs} />
    </>
  );
};
