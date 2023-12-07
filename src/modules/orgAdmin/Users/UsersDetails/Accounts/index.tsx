import TanstackTable from '@/components/Table/TanstackTable';

import { companyColumns, companyData } from './Accounts.data';

const Accounts = () => {
  return (
    <>
      <TanstackTable columns={companyColumns} data={companyData} isPagination />
    </>
  );
};

export default Accounts;
