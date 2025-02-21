import { useEffect, useState } from 'react';
import {
  PRODUCT_LISTS_ACTION_CONSTANTS,
  productListsColumnDynamic,
} from './ProductCatalog.data';
import { useRouter } from 'next/router';
import { ImportProductCatalog } from './ImportProductCatalog';
import usePath from '@/hooks/usePath';
import { PAGINATION } from '@/config';
import {
  useLazyGetExportProductCatalogQuery,
  useLazyGetProductCatalogQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { downloadFile } from '@/utils/file';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { EXPORT_FILE_TYPE } from '@/constants/file';

export const useProductCatalog = () => {
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { makePath } = usePath();
  const [hasProductAction, setHasProductAction] = useState(false);
  const router = useRouter();
  const getProductCatalogParam = new URLSearchParams();
  getProductCatalogParam?.append('page', page + '');
  getProductCatalogParam?.append('limit', pageLimit + '');
  getProductCatalogParam?.append('search', search);
  const getProductCatalogParameter = {
    queryParams: getProductCatalogParam,
  };

  const [lazyGetProductCatalogTrigger, lazyGetProductCatalogStatus] =
    useLazyGetProductCatalogQuery();

  const [
    lazyGetExportProductCatalogTrigger,
    lazyGetExportProductCatalogStatus,
  ] = useLazyGetExportProductCatalogQuery();

  const getProductCatalogListData = async () => {
    try {
      await lazyGetProductCatalogTrigger(getProductCatalogParameter)?.unwrap();
    } catch (error: any) {
      !!error?.data?.data?.message && errorSnackbar(error?.data?.data?.message);
    }
  };
  useEffect(() => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['productListAction'],
      }),
    );
  }, []);

  useEffect(() => {
    getProductCatalogListData();
  }, [search, page, pageLimit]);

  const handleSearch = (searchValue: string) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(searchValue);
  };

  const getProductListsDataExport = async (exportType: any) => {
    const getProductCatalogExportParam = {
      exportType,
      meta: false,
    };

    const getProductCatalogExportParameter = {
      queryParams: getProductCatalogExportParam,
    };
    try {
      const response: any = await lazyGetExportProductCatalogTrigger(
        getProductCatalogExportParameter,
      )?.unwrap();
      downloadFile(
        response,
        'productCatalogLists',
        EXPORT_FILE_TYPE?.[exportType],
      );
      successSnackbar(`Product exported successfully `);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const productListActionComponent: any = {
    [PRODUCT_LISTS_ACTION_CONSTANTS?.IMPORT]: (
      <ImportProductCatalog
        setIsDrawerOpen={setHasProductAction}
        isDrawerOpen={hasProductAction}
      />
    ),
  };

  const setProductListAction = (productListActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        productListAction: productListActionQuery,
      },
    });
    setTimeout(() => {
      setHasProductAction?.(true);
    }, 100);
  };
  const productListsColumn = productListsColumnDynamic(router);
  return {
    search,
    getProductListsDataExport,
    productListsColumn,
    productListActionComponent,
    hasProductAction,
    router,
    setProductListAction,
    lazyGetProductCatalogStatus,
    lazyGetExportProductCatalogStatus,
    getProductCatalogListData,
    setPage,
    setPageLimit,
    theme,
    handleSearch,
  };
};
