import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import { useGetAssociateTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useAssociations = () => {
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams?.get('purchaseOrderId');
  const [openDrawer, setOpenDrawer] = useState<any>(false);

  const associateTicketsAssetsParameter = {
    queryParams: {
      recordId: purchaseOrderId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.PURCHASE_ORDER,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
    },
  };

  const { data, isLoading, isError, isFetching } = useGetAssociateTicketsQuery(
    associateTicketsAssetsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!purchaseOrderId,
    },
  );

  return {
    data,
    openDrawer,
    setOpenDrawer,
    isLoading,
    isError,
    isFetching,
  };
};
