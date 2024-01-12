import { useRouter } from 'next/router';
import { useGetDetailVendorsListQuery } from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/overview';

export const useHeader = () => {
  const router = useRouter();
  const { vendorId } = router?.query;
  const { data } = useGetDetailVendorsListQuery({ vendorId });
  const singleVendorName = data?.data?.name;

  return {
    router,
    singleVendorName,
  };
};
