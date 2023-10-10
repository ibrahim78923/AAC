import React from 'react';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { companyColumns, companyData } from './CompanyAccounts.data';

const CompanyAccounts = () => {
  return (
    <>
      <TanstackTable columns={companyColumns} data={companyData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default CompanyAccounts;
