import { useState } from 'react';

import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';
import { PAGINATION } from '@/config';
import {
  useGetServiceCatalogCategoriesQuery,
  useGetServiceCatalogQuery,
} from '@/services/airCustomerPortal/catalog';
const useCatalog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const { data } = useGetServiceCatalogCategoriesQuery({
    param,
  });

  const { categoryId } = router?.query;

  const getServiceCatalogCategoriesParameter = {
    queryParam: {
      categoryId,
    },
  };
  const {
    data: services,
    isLoading,
    isFetching,
  } = useGetServiceCatalogQuery(getServiceCatalogCategoriesParameter, {
    refetchOnMountOrArgChange: true,
  });

  const results = services?.data;
  const [result, setResult] = useState<any[]>(results);

  const handleClick = (prop: string) => {
    let filteredServices;
    if (prop === CATALOG_SERVICE_TYPES?.ALL) {
      filteredServices = results;
    } else {
      filteredServices = results?.filter(
        (service: any) => service?.serviceCategory === prop,
      );
    }

    setResult(filteredServices);
  };
  const handleClickService = (id: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_CATALOG_SERVICE_DETAILS,
      query: {
        serviceId: id,
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return {
    handleClick,
    result,
    handleClickService,
    data,
    handleClickOpen,
    isLoading,
    isFetching,
    handlePageChange,
    setPageLimit,
    search,
    setPage,
    handleClose,
    setSearch,
    open,
  };
};

export default useCatalog;
