import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { accountDetailsTabsData } from './AccountDetailsTabs.data';
import { AccountDetailSecurity } from '../AccountDetailSecurity';
import { AccountDetailProfile } from '../AccountDetailProfile';

export const AccountDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={accountDetailsTabsData}>
      <AccountDetailProfile />
      <AccountDetailSecurity />
    </HorizontalTabs>
  );
};
