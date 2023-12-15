import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { accountDetailsTabsData } from './AccountDetailsTabs.data';
import { AccountDetailsSecurity } from '../AccountDetailsSecurity';
import { AccountDetailsProfile } from '../AccountDetailsProfile';

export const AccountDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={accountDetailsTabsData}>
      <AccountDetailsProfile />
      <AccountDetailsSecurity />
    </HorizontalTabs>
  );
};
