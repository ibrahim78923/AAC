import { Box } from '@mui/material';
import { purchaseOrderColumnsFunction } from './PurchaseOrders.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { PurchaseOrderExport } from './PurchaseOrderExport';
import { PurchaseOrderFilter } from './PurchaseOrderFilter';
import usePurchaseOrders from './usePurchaseOrders';
import { filterFields } from './PurchaseOrderFilter/PurchaseOrderFilter.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { DeletePurchaseOrder } from './DeletePurchaseOrder';
import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

function PurchaseOrder() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    router,
    deleteModalOpen,
    setDeleteModalOpen,
    purchaseOrderData,
    setPurchaseOrderData,
    purchaseData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    metaData,
    pageLimit,
    searchValue,
    setSearchValue,
    departmentDropdown,
    vendorDropdown,
  } = usePurchaseOrders();

  const purchaseOrderColumns = purchaseOrderColumnsFunction(
    purchaseOrderData,
    setPurchaseOrderData,
    purchaseData,
    router,
  );

  return (
    <>
      <PageTitledHeader
        title={'Purchase Order'}
        addTitle={'New Purchase Order'}
        // createPermissionKey={
        //   AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.NEW_PURCAHSE_ORDER
        // }
        handleAction={handleNewPurchaseOrder}
      />
      <Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1.5}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.SEARCH_AND_FILTER,
            ]}
          >
            <Search
              label="Search Here"
              searchBy={searchValue}
              setSearchBy={setSearchValue}
            />
          </PermissionsGuard>
          <Box
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={1.5}
          >
            <DeletePurchaseOrder
              deleteModalOpen={deleteModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              purchaseOrderData={purchaseOrderData}
              isDisabled={!!!purchaseOrderData?.length}
            />
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.EXPORT_PURCAHSE_ORDER,
              ]}
            >
              <PurchaseOrderExport />
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.SEARCH_AND_FILTER,
              ]}
            >
              <PurchaseOrderFilter
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                filterFields={filterFields}
                methods={methodsPurchaseOrderFilterForm}
                handleSubmit={submitPurchaseOrderFilterForm}
                handleReset={resetPurchaseOrderFilterForm}
                departmentDropdown={departmentDropdown}
                vendorDropdown={vendorDropdown}
              />
            </PermissionsGuard>
          </Box>
        </Box>
        <br />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.PURCAHSE_ORDER_LIST_VIEW,
          ]}
        >
          <TanstackTable
            data={purchaseData}
            columns={purchaseOrderColumns}
            isPagination={true}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            isSuccess={isSuccess}
            setPageLimit={setPageLimit}
            setPage={setPage}
            count={metaData?.pages}
            totalRecords={metaData?.total}
            onPageChange={(page: any) => setPage(page)}
            currentPage={metaData?.page}
            pageLimit={pageLimit}
          />
        </PermissionsGuard>

        {/* <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        /> */}
      </Box>
    </>
  );
}

export default PurchaseOrder;
