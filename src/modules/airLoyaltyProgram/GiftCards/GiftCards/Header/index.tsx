import { Box, Button, Typography, useTheme } from '@mui/material';
import { AddCircleBlackIcon, DesignPenIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants';

export const Header = ({ showButtons, setAddPhysicalCard }: any) => {
  const theme: any = useTheme();
  const router = useRouter();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mb={3}
    >
      <Box p={1}>
        <Typography variant="h4" color={theme?.palette?.slateBlue?.main}>
          Gift Cards
        </Typography>
      </Box>
      {showButtons && (
        <Box display={'flex'} gap={1}>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => setAddPhysicalCard(true)}
            startIcon={<AddCircleBlackIcon />}
          >
            Add
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<DesignPenIcon />}
            onClick={() => {
              router?.push({
                pathname: AIR_LOYALTY_PROGRAM?.PHYSICAL_GIFT_CARD_DESIGN,
              });
            }}
          >
            Design card
          </Button>
        </Box>
      )}
    </Box>
  );
};
