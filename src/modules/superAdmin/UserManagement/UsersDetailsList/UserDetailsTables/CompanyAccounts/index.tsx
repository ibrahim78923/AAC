import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { companyColumns } from './CompanyAccounts.data';
import useCompanyAccounts from './useCompanyAccounts';

const CompanyAccounts = () => {
  const { data } = useCompanyAccounts();

  return (
    <>
      <TanstackTable columns={companyColumns} data={data?.data?.useraccounts} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default CompanyAccounts;
