import { useGetAssociationsQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/associations';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useAssociations = () => {
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams?.get('purchaseOrderId');
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const { data, isLoading, isError, isFetching } = useGetAssociationsQuery(
    purchaseOrderId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!purchaseOrderId,
    },
  );
  const associationsList = data?.data;
  return {
    associationsList,
    openDrawer,
    setOpenDrawer,
    isLoading,
    isError,
    isFetching,
  };
};
