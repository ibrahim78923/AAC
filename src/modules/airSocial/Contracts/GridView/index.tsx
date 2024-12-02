import TanstackTable from '@/components/Table/TanstackTable';
import React from 'react';
import { contractsColumns, contractsData } from './GridView.data';

const ContractsGrid = () => {
  return (
    <div>
      <TanstackTable
        columns={contractsColumns()}
        data={contractsData}
        // isPagination={
        //   taskDataArray?.data?.taskmanagements?.length ? true : false
        // }
        // count={taskDataArray?.data?.meta?.pages}
        // totalRecords={taskDataArray?.data?.meta?.total}
        // onPageChange={handlePageChange}
        // setPage={setPage}
        // setPageLimit={setPageLimit}
        // currentPage={taskDataArray?.data?.meta?.page}
      />
    </div>
  );
};

export default ContractsGrid;
