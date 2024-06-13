import { useGetDealsActionPreviewQuery } from '@/services/airSales/deals';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

const useViewDetails = () => {
  const theme = useTheme();
  const selecetdDealId = useSearchParams()?.get('id');

  const { data: dealsDetailsData, isLoading } = useGetDealsActionPreviewQuery({
    id: selecetdDealId,
  });

  const viewDeal = dealsDetailsData?.data;

  return {
    theme,
    viewDeal,
    isLoading,
    selecetdDealId,
  };
};

export default useViewDetails;
