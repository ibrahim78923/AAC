import React from 'react';

import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { usePlanDetails } from './usePlanDetails';

const PlanDetails = ({ searchBy, getPlanManagementRowData }: any) => {
  const { tableRowData } = usePlanDetails(searchBy);
  return (
    <div>
      <TanstackTable columns={getPlanManagementRowData} data={tableRowData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </div>
  );
};

export default PlanDetails;
