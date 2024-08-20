import React, { useState } from 'react';

import TanstackTable from '@/components/Table/TanstackTable';

import { usePlanDetails } from './usePlanDetails';
import { PAGINATION } from '@/config';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS_KEYS } from '@/constants/permission-keys';
import { PlanDetailsProps } from './planDetails.interface';

const PlanDetails = ({
  getPlanManagementRowData,
  searchBy,
  filterValues,
}: PlanDetailsProps) => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const params = {
    ...filterValues,
    ...(searchBy && { search: searchBy }),
    page,
    limit,
  };
  const { tableRowData, isLoading } = usePlanDetails(params);
  return (
    <div>
      <PermissionsGuard
        permissions={[SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS_KEYS?.PLAN_LIST]}
      >
        <TanstackTable
          columns={getPlanManagementRowData}
          data={tableRowData?.data?.plans}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isPagination
          isLoading={isLoading}
          count={tableRowData?.data?.meta?.pages}
          totalRecords={tableRowData?.data?.meta?.total}
          onPageChange={(page: number) => setPage(page)}
          currentPage={tableRowData?.data?.meta?.page}
          pageLimit={tableRowData?.data?.meta?.limit}
        />
      </PermissionsGuard>
    </div>
  );
};

export default PlanDetails;
