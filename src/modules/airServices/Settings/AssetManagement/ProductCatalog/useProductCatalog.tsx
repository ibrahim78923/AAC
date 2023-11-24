import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  PRODUCT_LISTS_ACTION_CONSTANTS,
  productListsColumnDynamic,
} from './ProductCatalog.data';
import { useRouter } from 'next/router';
import { ImportProductCatalog } from './ImportProductCatalog';

export const useProductCatalog = () => {
  const [search, setSearch] = useState('');
  const [hasProductAction, setHasProductAction] = useState(false);
  const router = useRouter();
  const getProductListsDataExport = async (type: any) => {
    try {
      enqueueSnackbar(`Product Exported successfully as ${type}`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
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
  };
};
