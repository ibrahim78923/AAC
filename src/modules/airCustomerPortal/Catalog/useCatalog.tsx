import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { DATA_TYPES } from '@/constants/strings';
import { PAGINATION } from '@/config';
import {
  useGetServiceCatalogCategoriesQuery,
  useGetServiceCatalogQuery,
} from '@/services/airCustomerPortal/catalog';

const useCatalog = () => {
  const router: NextRouter = useRouter();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const param = {
    page: page,
    limit: pageLimit,
  };

  const serviceCatalogCategories = useGetServiceCatalogCategoriesQuery(
    {
      param,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { categoryId } = router?.query;
  const companyId = router?.query?.companyId;

  const getServiceCatalogCategoriesParameter = {
    queryParam: {
      categoryId,
    },
  };

  const {
    data: services,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetServiceCatalogQuery(getServiceCatalogCategoriesParameter, {
    refetchOnMountOrArgChange: true,
  });

  const handleClickService = (id: string, serviceCategory: string) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_CATALOG_SERVICE_DETAILS,
      query: {
        serviceId: id,
        categoryId: serviceCategory,
        ...(companyId && { companyId: companyId }),
      },
    });
  };

  const allCategories = [
    {
      _id: DATA_TYPES?.UNDEFINED,
      categoryName: 'All Services',
      description:
        'Browse the list of all services offered and raise a request.',
    },
    ...(serviceCatalogCategories?.data?.data?.servicecategories ?? []),
  ];

  return {
    handleClickService,
    serviceCatalogCategories,
    setPageLimit,
    setPage,
    isLoading,
    isFetching,
    router,
    services,
    categoryId,
    allCategories,
    isError,
    refetch,
    companyId,
  };
};

export default useCatalog;
