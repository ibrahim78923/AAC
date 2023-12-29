import {
  EXPORT_FILE_TYPE,
  MESSAGE_EXPORT_FILE_TYPE,
  NOTISTACK_VARIANTS,
} from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
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
      !!error?.data?.data?.message &&
        enqueueSnackbar(error?.data?.data?.message, {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
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

  const getProductListsDataExport = async (type: any) => {
    const getProductCatalogExportParam = {
      exportType: type,
      page,
      limit: pageLimit,
      search,
    };

    const getProductCatalogExportParameter = {
      queryParams: getProductCatalogExportParam,
    };
    try {
      const response: any = await lazyGetExportProductCatalogTrigger(
        getProductCatalogExportParameter,
      )?.unwrap();
      downloadFile(response, 'productCatalogLists', EXPORT_FILE_TYPE?.[type]);
      enqueueSnackbar(
        `Product exported successfully as ${MESSAGE_EXPORT_FILE_TYPE?.[type]}`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(`Product not exported as ${type}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
    setSearch,
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
  };
};
