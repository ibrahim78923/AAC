import React from 'react';

import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { UsePlanDetails } from './UsePlanDetails';

import { PlanDetailsData } from './PlanDetails.data';

const PlanDetails = () => {
  const { ticketsListsColumn } = UsePlanDetails();
  return (
    <div>
      <TanstackTable columns={ticketsListsColumn} data={PlanDetailsData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </div>
  );
};

export default PlanDetails;
