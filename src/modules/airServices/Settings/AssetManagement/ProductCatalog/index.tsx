import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useProductCatalog } from './useProductCatalog';
import { EXPORT_TYPE } from '@/constants/strings';
import { PRODUCT_LISTS_ACTION_CONSTANTS } from './ProductCatalog.data';
import { Box } from '@mui/material';
import { AIR_SERVICES } from '@/constants';

export const ProductCatalog = () => {
  const {
    setSearch,
    getProductListsDataExport,
    productListsColumn,
    productListActionComponent,
    hasProductAction,
    router,
    setProductListAction,
    lazyGetProductCatalogStatus,
    setPage,
    setPageLimit,
    theme,
  }: any = useProductCatalog();

  return (
    <>
      <PageTitledHeader
        title={'Product'}
        addTitle={'New Product'}
        hasExport
        hasImport
        canMovedBack
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
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <Box px={2}>
          <Search label="Search Here" setSearchBy={setSearch} />
        </Box>
        <Box marginY={3} />
        <TanstackTable
          columns={productListsColumn}
          data={lazyGetProductCatalogStatus?.data?.data?.productcatalogs}
          isLoading={lazyGetProductCatalogStatus?.isLoading}
          isError={lazyGetProductCatalogStatus?.isError}
          isFetching={lazyGetProductCatalogStatus?.isFetching}
          isSuccess={lazyGetProductCatalogStatus?.isSuccess}
          currentPage={lazyGetProductCatalogStatus?.data?.data?.meta?.page}
          count={lazyGetProductCatalogStatus?.data?.data?.meta?.pages}
          pageLimit={lazyGetProductCatalogStatus?.data?.data?.meta?.limit}
          totalRecords={lazyGetProductCatalogStatus?.data?.data?.meta?.total}
          isPagination
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
        />
      </Box>
      {hasProductAction &&
        productListActionComponent?.[
          router?.query?.productListAction as string
        ]}
    </>
  );
};
