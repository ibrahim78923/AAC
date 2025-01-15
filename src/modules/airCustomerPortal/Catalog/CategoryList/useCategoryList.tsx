import { PAGINATION } from '@/config';
import { useGetServiceCatalogCategoriesQuery } from '@/services/airCustomerPortal/catalog';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCategoryList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const param = {
    page: page,
    limit: pageLimit,
  };

  const { categoryId } = router?.query;
  const companyId = router?.query?.companyId;

  const { data, isError, isLoading, isFetching } =
    useGetServiceCatalogCategoriesQuery(
      {
        param,
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const showLoader = isLoading || isFetching;
  const categoryList = data?.data?.servicecategories ?? [];

  return {
    categoryList,
    showLoader,
    isError,
    setPage,
    setPageLimit,
    categoryId,
    companyId,
    router,
    data,
  };
};
