import { Box, Typography } from '@mui/material';
import ShopsTab from './ShopsTab';

const Management = () => {
  return (
    <>
      <Typography variant="h3" pb={2.4} textTransform="capitalize">
        manage Shop
      </Typography>
      <Typography variant="h4" pb={2}>
        Shops
      </Typography>
      <Box>
        <ShopsTab />
      </Box>
    </>
  );
};

export default Management;
