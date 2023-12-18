import { Box } from '@mui/material';
import { PhysicalGiftCardTabs } from './PhysicalGiftCardTabs';
import { usePhysicalGiftCards } from './usePhysicalGiftCards';

export const PhysicalGiftCards = (props: any) => {
  const { setShowButtons }: { setShowButtons: (value: boolean) => void } =
    props;
  const { theme } = usePhysicalGiftCards(setShowButtons);
  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={2}
      p={1.5}
    >
      <PhysicalGiftCardTabs />
    </Box>
  );
};
