import Image from 'next/image';

import { Box, Stack, Typography } from '@mui/material';

// import useStatusCards from './useStatusCards';

import { styles } from './StatusCards.style';

const StatusCards = () => {
  // const { theme } = useStatusCards();
  return (
    <Box sx={styles.statusCardStyle}>
      <Stack direction="row">
        <Image src="" alt="" />
        <Box>
          <Typography variant="h4">15</Typography>
          <Typography variant="h4">Sent</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default StatusCards;
