import { useGetOrganizationsQuery } from '@/services/common-APIs';
import { useState } from 'react';

const useInvoicesAnalyst = () => {
  const [monthsFilter, setMonthsFilter] = useState<HTMLButtonElement | null>(
    null,
  );
  const [clientsFilter, setClientsFilter] = useState<HTMLButtonElement | null>(
    null,
  );
  const [searchCompany, setSearchCompany] = useState<any>('');

  const openMonthsFilter = Boolean(monthsFilter);
  const openClientsFilter = Boolean(clientsFilter);

  const handleClickMonthsFilter = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setMonthsFilter(event?.currentTarget);
  };
  const handleCloseMonthsFilter = () => {
    setMonthsFilter(null);
  };
  const handleClickClientsFilter = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setClientsFilter(event?.currentTarget);
  };
  const handleCloseClientsFilter = () => {
    setClientsFilter(null);
  };

  const { data: organizationsList } = useGetOrganizationsQuery({});

  const customizeData = (organizations: any) => {
    return organizations?.data?.map((item: any) => ({
      label: item?.name,
      value: item?._id,
    }));
  };

  const monthFilter = [
    { label: 'Last Month', value: 'LAST_MONTH' },
    { label: 'Last Year', value: 'LAST_YEAR' },
    { label: 'Current Month', value: 'CURRENT_MONTH' },
    { label: 'Current Year', value: 'CURRENT_YEAR' },
  ];

  return {
    organizationsList,
    monthsFilter,
    openMonthsFilter,
    clientsFilter,
    openClientsFilter,
    handleClickMonthsFilter,
    handleCloseMonthsFilter,
    handleClickClientsFilter,
    handleCloseClientsFilter,
    customizeData,
    monthFilter,
    searchCompany,
    setSearchCompany,
  };
};

export default useInvoicesAnalyst;
