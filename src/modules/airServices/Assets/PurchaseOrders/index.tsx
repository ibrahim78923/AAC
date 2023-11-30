import React, { useState } from 'react';
import { Box } from '@mui/material';
import { data, purchaseOrderColumnsFunction } from './PurchaseOrders.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';

import { PurchaseOrderExport } from './PurchaseOrderExport';
import { PurchaseOrderFilter } from './PurchaseOrderFilter';

import usePurchaseOrders from './usePurchaseOrders';
import { filterFields } from './PurchaseOrderFilter/PurchaseOrderFilter.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import CustomPagination from '@/components/CustomPagination';

function PurchaseOrder() {
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    router,
  } = usePurchaseOrders();

  const purchaseOrderColumns = purchaseOrderColumnsFunction(
    purchaseOrderData,
    setPurchaseOrderData,
    data,
    router,
  );
  return (
    <>
      <PageTitledHeader
        title={'Purchase Order'}
        addTitle={'New Purchase Order'}
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
          <Search label="search" searchBy="" setSearchBy={''} />
          <Box
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={1.5}
          >
            <PurchaseOrderExport />
            <PurchaseOrderFilter
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              filterFields={filterFields}
              methods={methodsPurchaseOrderFilterForm}
              handleSubmit={submitPurchaseOrderFilterForm}
              handleReset={resetPurchaseOrderFilterForm}
            />
          </Box>
        </Box>
        <br />
        <TanstackTable data={data} columns={purchaseOrderColumns} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
    </>
  );
}

export default PurchaseOrder;
