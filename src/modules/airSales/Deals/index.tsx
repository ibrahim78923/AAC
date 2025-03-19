import { Box } from '@mui/material';
import DealsTab from './DealTab';
import { styles } from './deals.style';
import { useGetDealsViewsQuery } from '@/services/airSales/deals';
import { useState } from 'react';

const Deals = () => {
  const [search, setSearch] = useState<string>('');

  const { data: dealViewsData }: any = useGetDealsViewsQuery({
    search: search ? search : undefined,
  });
  const activeDealsViews = dealViewsData?.data?.filter(
    (item: any) => item?.isActive,
  );
  const dealHeaderParams = {
    setSearch,
    dealViewsData: dealViewsData?.data,
  };
  return (
    <Box sx={styles?.TableWrapper}>
      <DealsTab
        dealViewsData={activeDealsViews}
        dealHeaderParams={dealHeaderParams}
      />
    </Box>
  );
};

export default Deals;
