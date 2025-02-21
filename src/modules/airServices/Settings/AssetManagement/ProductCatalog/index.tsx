import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useProductCatalog } from './useProductCatalog';
import { PRODUCT_LISTS_ACTION_CONSTANTS } from './ProductCatalog.data';
import { Box } from '@mui/material';
import { AIR_SERVICES } from '@/constants/routes';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { EXPORT_TYPE } from '@/constants/file';

export const ProductCatalog = () => {
  const {
    handleSearch,
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
    getProductCatalogListData,
  } = useProductCatalog();

  return (
    <>
      <PageTitledHeader
        title={'Product Catalog'}
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
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_PRODUCT_CATEGORIES,
        ]}
        exportPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_CATEGORIES,
        ]}
        importPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_CATEGORIES,
        ]}
      />
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_CATEGORIES,
          ]}
        >
          <Box px={2}>
            <Search label="Search Here" setSearchBy={handleSearch} />
          </Box>
        </PermissionsGuard>
        <Box marginY={3} />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_LIST_OF_PRODUCT_CATEGORIES,
          ]}
        >
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
            onPageChange={(page: number) => setPage(page)}
            errorProps={{
              canRefresh: true,
              refresh: getProductCatalogListData,
            }}
          />
        </PermissionsGuard>
      </Box>
      {hasProductAction &&
        productListActionComponent?.[
          router?.query?.productListAction as string
        ]}
    </>
  );
};
