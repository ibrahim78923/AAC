import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetAirServicesSettingsServiceCatalogCategoriesQuery,
  useGetAirServicesSettingsServiceCatalogQuery,
} from '@/services/airServices/settings/service-management/service-catalog';
import { PAGINATION } from '@/config';

const useServicesCatalog = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const param = {
    page: page,
    limit: pageLimit,
    search,
  };
  const {
    data: Categories,
    isError,
    isSuccess,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
  } = useGetAirServicesSettingsServiceCatalogCategoriesQuery(
    { param },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const categories = Categories?.data?.servicecategories;
  const { categoryId } = router?.query;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getServiceCatalogCategoriesParameter = {
    queryParam: {
      categoryId,
    },
  };
  const { data, isLoading, isFetching } =
    useGetAirServicesSettingsServiceCatalogQuery(
      getServiceCatalogCategoriesParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const results = data?.data;
  const paginationData = Categories?.data?.meta;

  const isAnyCheckboxSelected = () => {
    return selectedCheckboxes?.length > 0;
  };

  return {
    results,
    selectedCheckboxes,
    setSelectedCheckboxes,
    open,
    setOpen,
    handleClickOpen,
    categories,
    isLoading,
    isFetching,
    setPageLimit,
    setPage,
    setSearch,
    isError,
    isSuccess,
    handlePageChange,
    isAnyCheckboxSelected,
    paginationData,
    categoriesIsLoading,
    categoriesIsFetching,
  };
};

export default useServicesCatalog;
