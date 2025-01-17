import { useRouter } from 'next/router';
import { useGetDetailVendorsListQuery } from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/overview';
import { overviewDataArray } from './Overview.data';

export const useOverview = () => {
  const router = useRouter();
  const { vendorId } = router.query;
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDetailVendorsListQuery(
      { vendorId },
      {
        refetchOnMountOrArgChange: true,
        skip: !!!vendorId,
      },
    );
  const overviewData = overviewDataArray(data?.data);

  return {
    isLoading,
    overviewData,
    isFetching,
    isError,
    refetch,
  };
};
