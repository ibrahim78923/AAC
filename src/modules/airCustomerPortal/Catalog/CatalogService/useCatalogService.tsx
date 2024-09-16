import { useGetServiceCatalogCategoriesDetailsQuery } from '@/services/airCustomerPortal/catalog';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';

const useCatalogService = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const theme: Theme = useTheme();
  const { serviceId, categoryId } = router?.query;
  const companyId = router?.query?.companyId;

  const getServiceCatalogCategoriesDetailsParameter = {
    queryParam: {
      id: serviceId,
      categoryId,
    },
  };

  const {
    data: servicesDetails,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetServiceCatalogCategoriesDetailsQuery(
    getServiceCatalogCategoriesDetailsParameter,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return {
    open,
    setOpen,
    servicesDetails,
    isLoading,
    isFetching,
    isError,
    refetch,
    router,
    theme,
    companyId,
  };
};

export default useCatalogService;
