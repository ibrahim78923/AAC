import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { GiftCardTabsData } from './GiftCardTabs.data';
import { DigitalGiftCards } from '../DigitalGiftCards';
import { PhysicalGiftCards } from '../PhysicalGiftCards';
import { useState } from 'react';
import { Header } from '../Header';

export const GiftCardTabs = () => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <>
      <Header showButtons={showButtons} />
      <HorizontalTabs tabsDataArray={GiftCardTabsData}>
        <DigitalGiftCards setShowButtons={setShowButtons} />
        <PhysicalGiftCards setShowButtons={setShowButtons} />
      </HorizontalTabs>
    </>
  );
};
