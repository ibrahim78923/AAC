import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { PhysicalGiftCardTabsData } from './PhysicalGiftCardTabs.data';
import { NotAssignedPhysicalGiftCards } from '../NotAssignedPhysicalGiftCards';
import { AssignedPhysicalGiftCards } from '../AssignedPhysicalGiftCards';

export const PhysicalGiftCardTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={PhysicalGiftCardTabsData}>
      <AssignedPhysicalGiftCards />
      <NotAssignedPhysicalGiftCards />
    </HorizontalTabs>
  );
};
