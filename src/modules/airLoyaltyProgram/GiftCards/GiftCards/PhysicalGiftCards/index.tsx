import { Box } from '@mui/material';
import { PhysicalGiftCardTabs } from './PhysicalGiftCardTabs';
import { usePhysicalGiftCards } from './usePhysicalGiftCards';
import { AddPhysicalGiftCard } from './AddPhysicalGiftCard';

export const PhysicalGiftCards = (props: any) => {
  const { setShowButtons, addPhysicalCard, setAddPhysicalCard } = props;
  const { theme } = usePhysicalGiftCards(setShowButtons);
  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={2}
      p={1.5}
    >
      <PhysicalGiftCardTabs />
      <AddPhysicalGiftCard
        addPhysicalCard={addPhysicalCard}
        setAddPhysicalCard={setAddPhysicalCard}
      />
    </Box>
  );
};
