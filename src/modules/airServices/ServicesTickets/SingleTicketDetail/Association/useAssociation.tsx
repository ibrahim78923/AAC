import { useState } from 'react';
import { drawerInitialState, getDropdownOptions } from './Association.data';
import { useGetAirServicesAssociateTicketsProductsQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { PRODUCT_LABELS } from '@/constants';

export default function useAssociation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState({ ...drawerInitialState });

  const { data, isLoading, isFetching } =
    useGetAirServicesAssociateTicketsProductsQuery?.(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const hasAirSales = data?.data?.find(
    (item: any) => item?.name === PRODUCT_LABELS?.AIR_SALES,
  );

  const dropdownOptions = getDropdownOptions({ setIsDrawerOpen, hasAirSales });

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
    isLoading,
    isFetching,
    hasAirSales,
  };
}
