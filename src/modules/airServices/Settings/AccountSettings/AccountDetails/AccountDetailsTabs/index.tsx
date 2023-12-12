import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { accountDetailsTabsData } from './AccountDetailsTabs.data';
import { AccountDetailSecurity } from '../AccountDetailSecurity';
import { AccountDetailsProfile } from '../AccountDetailsProfile';

export const AccountDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={accountDetailsTabsData}>
      <AccountDetailsProfile />
      <AccountDetailSecurity />
    </HorizontalTabs>
  );
};
