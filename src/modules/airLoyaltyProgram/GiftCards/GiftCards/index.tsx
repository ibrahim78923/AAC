import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { DigitalGiftCards } from './DigitalGiftCards';
import { PhysicalGiftCards } from './PhysicalGiftCards';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const GiftCard = () => {
  return (
    <>
      <PageTitledHeader title={'Gift Cards'} />
      <HorizontalTabs tabsDataArray={['Digital', 'Physical']}>
        <DigitalGiftCards />
        <PhysicalGiftCards />
      </HorizontalTabs>
    </>
  );
};
