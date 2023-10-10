import React from 'react';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { UsePlanDetails } from './UsePlanDetails';

import { PlanDetailsData } from './PlanDetails.data';

const PlanDetails = () => {
  const { ticketsListsColumn } = UsePlanDetails();
  return (
    <div>
      <TanstackTable columns={ticketsListsColumn} data={PlanDetailsData} />
    </div>
  );
};

export default PlanDetails;
