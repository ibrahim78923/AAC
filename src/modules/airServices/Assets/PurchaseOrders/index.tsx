import TanstackTable from '@/components/Table/TanstackTable';
import { PurchaseOrderFilter } from './PurchaseOrderFilter';
import usePurchaseOrders from './usePurchaseOrders';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { DeletePurchaseOrder } from './DeletePurchaseOrder';
import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { PurchaseOrderHeader } from './PurchaseOrderHeader';
import { EXPORT_TYPE } from '@/constants/strings';
import { Box } from '@mui/material';

const PurchaseOrder = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    deleteModalOpen,
    setDeleteModalOpen,
    purchaseOrderData,
    setPurchaseOrderData,
    setPage,
    setPageLimit,
    page,
    handleSearch,
    lazyGetPurchaseOrderListStatus,
    purchaseOrderColumns,
    getPurchaseOrderListDataExport,
    purchaseOrderFilter,
    setPurchaseOrderFilter,
    getPurchaseOrderListData,
    theme,
  }: any = usePurchaseOrders();

  return (
    <>
      <PageTitledHeader
        title={'Purchase Order'}
        addTitle={'New Purchase Order'}
        createPermissionKey={[
          AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.NEW_PURCAHSE_ORDER,
        ]}
        handleAction={handleNewPurchaseOrder}
      />
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <PurchaseOrderHeader
          handleExcelExport={() =>
            getPurchaseOrderListDataExport?.(EXPORT_TYPE?.XLS)
          }
          handleCsvExport={() =>
            getPurchaseOrderListDataExport?.(EXPORT_TYPE?.CSV)
          }
          deleteButtonDisabled={!!!purchaseOrderData?.length}
          setSearchValue={handleSearch}
          onFilterClick={() => setIsDrawerOpen?.(true)}
          onDeleteClick={() => setDeleteModalOpen?.(true)}
        />
        <br />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.PURCAHSE_ORDER_LIST_VIEW,
          ]}
        >
          <TanstackTable
            data={lazyGetPurchaseOrderListStatus?.data?.data?.purchases}
            columns={purchaseOrderColumns}
            isPagination
            isLoading={lazyGetPurchaseOrderListStatus?.isLoading}
            isError={lazyGetPurchaseOrderListStatus?.isError}
            isFetching={lazyGetPurchaseOrderListStatus?.isFetching}
            isSuccess={lazyGetPurchaseOrderListStatus?.isSuccess}
            setPageLimit={setPageLimit}
            setPage={setPage}
            count={lazyGetPurchaseOrderListStatus?.data?.data?.meta?.pages}
            totalRecords={
              lazyGetPurchaseOrderListStatus?.data?.data?.meta?.total
            }
            onPageChange={(page: any) => setPage(page)}
            currentPage={lazyGetPurchaseOrderListStatus?.data?.data?.meta?.page}
            pageLimit={lazyGetPurchaseOrderListStatus?.data?.data?.meta?.limit}
            errorProps={{ canRefresh: true, refresh: getPurchaseOrderListData }}
            noDataTableText="No purchase order found"
          />
        </PermissionsGuard>
      </Box>
      {deleteModalOpen && (
        <DeletePurchaseOrder
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          purchaseOrderData={purchaseOrderData}
          setPurchaseOrderData={setPurchaseOrderData}
          setPage={setPage}
          page={page}
          getPurchaseOrderListData={getPurchaseOrderListData}
          totalRecords={
            lazyGetPurchaseOrderListStatus?.data?.data?.purchases?.length
          }
        />
      )}

      {isDrawerOpen && (
        <PurchaseOrderFilter
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          purchaseOrderFilter={purchaseOrderFilter}
          setPurchaseOrderFilter={setPurchaseOrderFilter}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default PurchaseOrder;
