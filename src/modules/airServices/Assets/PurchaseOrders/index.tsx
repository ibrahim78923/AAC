import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { data, columns } from './PurchaseOrders.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';

import { styles } from './PurchaseOrders.style';

import AssetHead from '../AssetHead/index';
import { PurchaseOrderExport } from './components/PurchaseOrderExport';
import { PurchaseOrderFilter } from './components/PurchaseOrderFilter';

import usePurchaseOrders from './usePurchaseOrders';
import { filterFields } from './components/PurchaseOrderFilter/PurchaseOrderFilter.data';

function PurchaseOrder() {
  const theme: any = useTheme();

  const [meetingsData, setMeetingsData] = useState([]);

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
  } = usePurchaseOrders();

  const { tableWrapperStyle, flexBetween } = styles;

  return (
    <>
      <AssetHead
        title={'Purchase Order'}
        addTitle={'New Purchase Order'}
        handleAction={handleNewPurchaseOrder}
      />
      <Box sx={{ ...tableWrapperStyle }}>
        <Box sx={{ ...flexBetween, padding: '.75rem 1.5rem' }}>
          <Search label="search" searchBy="" setSearchBy={''} />
          <Box sx={{ display: 'flex', gap: 1 }}>
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
        <TanstackTable
          data={data}
          columns={columns(meetingsData, setMeetingsData, data, theme)}
        />
      </Box>
    </>
  );
}

export default PurchaseOrder;
