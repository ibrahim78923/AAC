import { Box } from '@mui/material';
import DealHeader from './DealHeader';
import DealsTab from './DealTab';
import { styles } from './deals.style';

const Deals = () => {
  return (
    <Box sx={styles?.TableWrapper}>
      <DealHeader />
      <DealsTab />
    </Box>
  );
};

export default Deals;
