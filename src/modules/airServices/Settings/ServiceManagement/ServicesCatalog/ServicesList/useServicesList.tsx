import { useLazyGetAirServicesSettingsServiceCatalogQuery } from '@/services/airServices/settings/service-management/service-catalog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useServicesList = () => {
  const router = useRouter();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);

  const { categoryId } = router?.query;

  const [
    lazyGetAirServicesSettingsServiceCatalogTrigger,
    lazyGetAirServicesSettingsServiceCatalogStatus,
  ] = useLazyGetAirServicesSettingsServiceCatalogQuery();

  const getServicesList = async () => {
    const apiDataParameter = {
      queryParam: {
        categoryId,
      },
    };
    try {
      await lazyGetAirServicesSettingsServiceCatalogTrigger(
        apiDataParameter,
      )?.unwrap();
      setSelectedCheckboxes?.([]);
    } catch (error) {}
  };

  const services = lazyGetAirServicesSettingsServiceCatalogStatus?.data?.data;

  useEffect(() => {
    getServicesList();
  }, [categoryId]);

  const showLoader =
    lazyGetAirServicesSettingsServiceCatalogStatus?.isLoading ||
    lazyGetAirServicesSettingsServiceCatalogStatus?.isFetching;

  const hasError = lazyGetAirServicesSettingsServiceCatalogStatus?.isError;

  return {
    services,
    selectedCheckboxes,
    setSelectedCheckboxes,
    showLoader,
    hasError,
    getServicesList,
    router,
  };
};
