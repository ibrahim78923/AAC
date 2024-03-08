import { useLazyGetPurchaseOrderByIdQuery } from '@/services/airServices/assets/purchase-orders';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useHeader = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams.get('purchaseOrderId');
  const [purchaseOrderTrigger, { data }]: any =
    useLazyGetPurchaseOrderByIdQuery();
  useEffect(() => {
    const handleStatus = async () => {
      await purchaseOrderTrigger(purchaseOrderId);
    };
    handleStatus();
  }, [purchaseOrderId]);
  const statusData = data?.data?.status;

  return {
    push,
    statusData,
  };
};
