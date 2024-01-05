import React, { useState } from 'react';

import TanstackTable from '@/components/Table/TanstackTable';

import { usePlanDetails } from './usePlanDetails';
import { PAGINATION } from '@/config';

const PlanDetails = ({ getPlanManagementRowData }: any) => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const params = {
    page,
    limit,
  };
  const { tableRowData, isLoading } = usePlanDetails(params);
  return (
    <div>
      <TanstackTable
        columns={getPlanManagementRowData}
        data={tableRowData?.data?.plans}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        isLoading={isLoading}
        currentPage={tableRowData?.data?.meta?.pages}
        count={tableRowData?.data?.meta?.pages}
        pageLimit={tableRowData?.data?.meta?.limit}
        totalRecords={tableRowData?.data?.meta?.total}
        isSuccess={true}
        onPageChange={(page: any) => setPage(page)}
      />
    </div>
  );
};

export default PlanDetails;
