import { useGetAirServicesSettingsServiceCatalogCategoriesQuery } from '@/services/airServices/settings/service-management/service-catalog';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { PAGINATION } from '@/config';

export const useCategoriesList = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const router: any = useRouter();
  const theme: any = useTheme();

  const param = {
    page: page,
    limit: pageLimit,
  };

  const { data, isError, isSuccess, isLoading, isFetching, refetch } =
    useGetAirServicesSettingsServiceCatalogCategoriesQuery(
      { param },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const categories = data?.data?.servicecategories;
  const paginationData = data?.data?.meta;
  const { categoryId } = router?.query;

  const openPortal = () => {
    setIsPortalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return {
    router,
    theme,
    data,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    isPortalOpen,
    categories,
    paginationData,
    setPageLimit,
    setPage,
    setIsPortalOpen,
    openPortal,
    handlePageChange,
    categoryId,
    refetch,
  };
};
