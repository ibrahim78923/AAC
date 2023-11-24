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
        handleExcelExport={() => getProductListsDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => getProductListsDataExport?.(EXPORT_TYPE?.CSV)}
        handleAction={() => {}}
        handleImport={() =>
          setProductListAction(PRODUCT_LISTS_ACTION_CONSTANTS?.IMPORT)
        }
      />
      <Search
        label="search"
        width="100%"
        value={search}
        onChange={(e: any) => setSearch(e?.target?.value)}
      />
      <Box marginY={3}></Box>
      <TanstackTable
        columns={productListsColumn}
        data={productListsData}
        isPagination
      />
      {hasProductAction &&
        productListActionComponent?.[router?.query?.ticketAction as string]}
    </>
  );
};
