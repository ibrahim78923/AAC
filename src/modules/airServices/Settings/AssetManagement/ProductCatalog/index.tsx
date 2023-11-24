import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useProductCatalog } from './useProductCatalog';
import { EXPORT_TYPE } from '@/constants/strings';
import {
  PRODUCT_LISTS_ACTION_CONSTANTS,
  productListsData,
} from './ProductCatalog.data';
import { Box } from '@mui/material';
import { AIR_SERVICES } from '@/constants';

export const ProductCatalog = () => {
  const {
    search,
    setSearch,
    getProductListsDataExport,
    productListsColumn,
    productListActionComponent,
    hasProductAction,
    router,
    setProductListAction,
  } = useProductCatalog();
  return (
    <>
      <PageTitledHeader
        title={'Product'}
        addTitle={'New Product'}
        hasExport
        hasImport
        hasMovedBack
        handleExcelExport={() => getProductListsDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => getProductListsDataExport?.(EXPORT_TYPE?.CSV)}
        handleAction={() =>
          router?.push({
            pathname: AIR_SERVICES?.UPSERT_PRODUCT_CATALOG,
          })
        }
        handleImport={() =>
          setProductListAction?.(PRODUCT_LISTS_ACTION_CONSTANTS?.IMPORT)
        }
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
          })
        }
      />
      <Search
        label="search"
        width="100%"
        value={search}
        onChange={(e: any) => setSearch(e?.target?.value)}
      />
      <Box marginY={3} />
      <TanstackTable
        columns={productListsColumn}
        data={productListsData}
        isPagination
      />
      {hasProductAction &&
        productListActionComponent?.[
          router?.query?.productListAction as string
        ]}
    </>
  );
};
