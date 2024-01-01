import { useTheme } from '@mui/material';
import { overviewDataArray } from './Overview.data';
import { useRouter } from 'next/router';
import { useGetDetailVendorsListQuery } from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/overview';

export const useOverview = () => {
  const theme = useTheme();
  const router = useRouter();
  const { vendorId } = router.query;
  const { data, isLoading } = useGetDetailVendorsListQuery({ vendorId });
  const overviewData = overviewDataArray(data?.data);

  return {
    theme,
    isLoading,
    overviewData,
  };
};
