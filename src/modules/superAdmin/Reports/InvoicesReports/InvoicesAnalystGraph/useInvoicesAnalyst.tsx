import { useGetOrganizationsQuery } from '@/services/dropdowns';
import { useState } from 'react';

const useInvoicesAnalyst = () => {
  const [monthsFilter, setMonthsFilter] = useState<HTMLButtonElement | null>(
    null,
  );
  const [clientsFilter, setClientsFilter] = useState<HTMLButtonElement | null>(
    null,
  );
  const [searchCompany, setSearchCompany] = useState<string>('');

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

  const organizationParams = {
    search: searchCompany ? searchCompany : undefined,
  };
  const { data: organizationsList } = useGetOrganizationsQuery({
    params: organizationParams,
  });

  const customizeData = (organizations: any) => {
    return organizations?.map((item: any) => ({
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
