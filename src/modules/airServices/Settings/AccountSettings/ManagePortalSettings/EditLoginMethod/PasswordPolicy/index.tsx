import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { PasswordPolicyTabsData } from './PasswordPolicy.data';
import { HighPasswordPolicy } from './HighPasswordPolicy';
import { MediumPasswordPolicy } from './MediumPasswordPolicy';
import { LowPasswordPolicy } from './LowPasswordPolicy';

export const PasswordPolicy = () => {
  return (
    <HorizontalTabs tabsDataArray={PasswordPolicyTabsData}>
      <LowPasswordPolicy />
      <MediumPasswordPolicy />
      <HighPasswordPolicy />
    </HorizontalTabs>
  );
};
