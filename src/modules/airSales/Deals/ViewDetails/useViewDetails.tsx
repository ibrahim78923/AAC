import { useGetDealsActionPreviewQuery } from '@/services/airSales/deals';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

const useViewDetails = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;

  const { data: dealsDetailsData, isLoading } = useGetDealsActionPreviewQuery({
    id,
  });
  const viewDeal = dealsDetailsData?.data;

  return {
    theme,
    viewDeal,
    isLoading,
    id,
  };
};

export default useViewDetails;
