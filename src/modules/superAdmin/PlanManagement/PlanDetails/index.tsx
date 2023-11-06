import React from 'react';

import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { usePlanDetails } from './usePlanDetails';

const PlanDetails = () => {
  const { ticketsListsColumn, tableRowData } = usePlanDetails();
  return (
    <div>
      <TanstackTable columns={ticketsListsColumn} data={tableRowData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </div>
  );
};

export default PlanDetails;
