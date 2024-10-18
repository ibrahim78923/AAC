import { Box } from '@mui/material';
import DealHeader from './DealHeader';
import DealsTab from './DealTab';
import { styles } from './deals.style';
import { useGetDealsViewsQuery } from '@/services/airSales/deals';
import { useState } from 'react';

const Deals = () => {
  const [search, setSearch] = useState<string>('');
  // use after search params added in api
  // const { data: dealViewsData }: any = useGetDealsViewsQuery({ search: search });
  const { data: dealViewsData }: any = useGetDealsViewsQuery({});
  const activeDealsViews = dealViewsData?.data?.filter(
    (item: any) => item?.isActive,
  );

  const dealHeaderParams = {
    // no need search in this params
    search,
    setSearch,
    dealViewsData: dealViewsData?.data,
  };

  return (
    <Box sx={styles?.TableWrapper}>
      <DealHeader dealHeaderParams={dealHeaderParams} />
      <DealsTab dealViewsData={activeDealsViews} />
    </Box>
  );
};

export default Deals;
