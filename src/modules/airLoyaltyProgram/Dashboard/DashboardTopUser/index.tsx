import TanstackTable from '@/components/Table/TanstackTable';
import React from 'react';
import { useDashboardTopUser } from './useDashboardTopUser';
import { CardsWrapper } from '../CardsWrapper';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
const DashboardTopUser = () => {
  const { dashboardTopUserColumns, data } = useDashboardTopUser();
  return (
    <CardsWrapper href={AIR_LOYALTY_PROGRAM?.TOP_USER} title="Top User">
      <TanstackTable
        data={data}
        columns={dashboardTopUserColumns}
        isFetching={false}
        isLoading={false}
        isError={false}
        isSuccess={true}
      />
    </CardsWrapper>
  );
};

export default DashboardTopUser;
