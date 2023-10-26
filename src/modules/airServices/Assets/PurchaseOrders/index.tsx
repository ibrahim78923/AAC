import React, { useState } from 'react';
import { Box } from '@mui/material';
import { data, purchaseOrderColumnsFunction } from './PurchaseOrders.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';

import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import { PurchaseOrderExport } from './PurchaseOrderExport';
import { PurchaseOrderFilter } from './PurchaseOrderFilter';

import usePurchaseOrders from './usePurchaseOrders';
import { filterFields } from './PurchaseOrderFilter/PurchaseOrderFilter.data';

function PurchaseOrder() {
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    handlePurchaseOrderDetail,
    router,
  } = usePurchaseOrders();

  const purchaseOrderColumns = purchaseOrderColumnsFunction(
    purchaseOrderData,
    setPurchaseOrderData,
    data,
    router,
    handlePurchaseOrderDetail,
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
      </Box>
    </>
  );
}

export default PurchaseOrder;
