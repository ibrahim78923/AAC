import { useGetPurchaseOrderOverviewQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/overview';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const { push } = useRouter();
  const router = useRouter();
  const purchaseOrderId = router?.query?.purchaseOrderId;
  const { data, isLoading, isFetching } =
    useGetPurchaseOrderOverviewQuery(purchaseOrderId);
  const name = data?.data?.orderName;
  return {
    push,
    name,
    isLoading,
    isFetching,
  };
};
