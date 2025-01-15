import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { SERVICE_CATALOG_STATUSES } from '@/constants/strings';
import { useGetServiceCatalogQuery } from '@/services/airCustomerPortal/catalog';
import { useRouter } from 'next/router';

export const useServicesList = () => {
  const router = useRouter();
  const { categoryId } = router?.query;
  const companyId = router?.query?.companyId;

  const getServiceCatalogCategoriesParameter = {
    queryParam: {
      categoryId,
      status: SERVICE_CATALOG_STATUSES?.PUBLISHED,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServiceCatalogQuery(getServiceCatalogCategoriesParameter, {
      refetchOnMountOrArgChange: true,
    });

  const handleClickService = (id: string, serviceCategory: string) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_CATALOG_SERVICE_DETAILS,
      query: {
        serviceId: id,
        categoryId: serviceCategory,
        ...(!!companyId && { companyId }),
      },
    });
  };

  const showLoader = isLoading || isFetching;
  const services = data?.data;

  return {
    handleClickService,
    isError,
    refetch,
    showLoader,
    services,
  };
};
