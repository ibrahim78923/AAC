import React from 'react';

import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { usePlanDetails } from './usePlanDetails';

import { PlanDetailsData } from './PlanDetails.data';

const PlanDetails = () => {
  const { ticketsListsColumn } = usePlanDetails();
  return (
    <div>
      <TanstackTable columns={ticketsListsColumn} data={PlanDetailsData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </div>
  );
};

export default PlanDetails;
