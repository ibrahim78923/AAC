import { Box } from '@mui/material';
import DealHeader from './DealHeader';
import DealsTab from './DealTab';
import { styles } from './deals.style';
import { useGetDealsViewsQuery } from '@/services/airSales/deals';

const Deals = () => {
  const { data: dealViewsData }: any = useGetDealsViewsQuery({});

  return (
    <Box sx={styles?.TableWrapper}>
      <DealHeader dealViewsData={dealViewsData?.data} />
      <DealsTab dealViewsData={dealViewsData?.data} />
    </Box>
  );
};

export default Deals;
