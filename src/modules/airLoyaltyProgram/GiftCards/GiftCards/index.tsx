import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { DigitalGiftCards } from './DigitalGiftCards';
import { PhysicalGiftCards } from './PhysicalGiftCards';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

export const GiftCard = () => {
  return (
    <>
      <PageTitledHeader title={'Gift Cards'} />
      <HorizontalTabs tabsDataArray={['Digital', 'Physical']}>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD
          }
        >
          <DigitalGiftCards />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD
          }
        >
          <PhysicalGiftCards />
        </PermissionsGuard>
      </HorizontalTabs>
    </>
  );
};
