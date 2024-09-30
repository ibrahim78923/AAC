import { useGetAirServicesAssetsPurchaseOrderStatusByIdQuery } from '@/services/airServices/assets/purchase-orders';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const router = useRouter();

  const { purchaseOrderId } = router?.query;

  const { data, isLoading, isFetching }: any =
    useGetAirServicesAssetsPurchaseOrderStatusByIdQuery(purchaseOrderId, {
      refetchOnMountOrArgChange: true,
      skip: !!!purchaseOrderId,
    });

  return {
    router,
    data,
    isLoading,
    isFetching,
  };
};
