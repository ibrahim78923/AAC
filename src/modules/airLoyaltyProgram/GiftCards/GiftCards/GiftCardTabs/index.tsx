import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { GiftCardTabsData } from './GiftCardTabs.data';
import { DigitalGiftCards } from '../DigitalGiftCards';
import { PhysicalGiftCards } from '../PhysicalGiftCards';
import { useState } from 'react';
import { Header } from '../Header';

export const GiftCardTabs = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [addPhysicalCard, setAddPhysicalCard] = useState(false);

  return (
    <>
      <Header
        showButtons={showButtons}
        setAddPhysicalCard={setAddPhysicalCard}
      />
      <HorizontalTabs tabsDataArray={GiftCardTabsData}>
        <DigitalGiftCards setShowButtons={setShowButtons} />
        <PhysicalGiftCards
          setShowButtons={setShowButtons}
          addPhysicalCard={addPhysicalCard}
          setAddPhysicalCard={setAddPhysicalCard}
        />
      </HorizontalTabs>
    </>
  );
};
