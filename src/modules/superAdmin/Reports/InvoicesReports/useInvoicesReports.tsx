import { PAGINATION } from '@/config';
import { useGetInvoicesReportsQuery } from '@/services/superAdmin/reports';
import { useState } from 'react';

const useInvoicesReports = () => {
  const [searchBy, setSearchBy] = useState<any>('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const currentMonth = 'CURRENT_MONTH';
  const [filter, setFilter] = useState<any>({
    clients: [],
    month: currentMonth,
  });

  const invoicesReportsParams = {
    page: page,
    limit: limit,
    dateType: filter?.month,
    organizationId: filter?.clients,
    search: searchBy ? searchBy : undefined,
  };
  const {
    data: invoicesReportsData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetInvoicesReportsQuery(invoicesReportsParams);
  const invoicesReportsGraph = invoicesReportsData?.data?.res;
  const invoicesReportsList = invoicesReportsData?.data?.list?.invoices;

  const resetFilters = () => {
    setFilter({
      clients: [],
      month: currentMonth,
    });
  };

  return {
    setPage,
    setLimit,
    setSearchBy,
    isLoading,
    invoicesReportsGraph,
    invoicesReportsList,
    invoicesReportsData,
    isSuccess,
    isFetching,
    filter,
    setFilter,
    resetFilters,
  };
};

export default useInvoicesReports;
