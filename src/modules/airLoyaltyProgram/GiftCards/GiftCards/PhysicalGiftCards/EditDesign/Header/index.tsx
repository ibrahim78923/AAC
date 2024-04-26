import { GrayPlusIcon } from '@/assets/icons';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Box, Button, useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/router';

export const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={1.5}
      pl={3}
      pr={3}
      borderBottom={`.1rem solid${theme?.palette?.grey[700]}`}
      bgcolor={'white'}
    >
      <Button
        color="secondary"
        variant="outlined"
        startIcon={<GrayPlusIcon />}
        sx={{
          border: 'none',
          '&:hover': {
            border: 'none',
          },
        }}
        onClick={() => {
          router?.push(AIR_LOYALTY_PROGRAM?.PHYSICAL_GIFT_CARD_DESIGN);
        }}
      >
        Back to Design
      </Button>
      <Chip
        sx={{ borderRadius: 1, bgcolor: theme?.palette?.grey[700] }}
        label="Share My Dine"
      />
      <Button variant="contained">Done</Button>
    </Box>
  );
};
