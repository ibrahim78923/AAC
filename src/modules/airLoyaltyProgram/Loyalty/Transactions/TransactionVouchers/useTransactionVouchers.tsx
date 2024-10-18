import { useState } from 'react';
import { transactionsPointsColumns } from './TransactionVouchers.data';
import { PAGINATION } from '@/config';
import { TransactionVouchersFilter } from './TransactionVouchersFilter';
import { getActivePermissionsSession } from '@/utils';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants';

export const useTransactionVouchers = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isFilter, setIsFilter] = useState<any>({});
  const router = useRouter();
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
  const getTransactionVouchers: any = {};
  const setVouchersDrawerContent = () => {
    if (isDrawerOpen) {
      return (
        <TransactionVouchersFilter
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          isFilter={isFilter}
          setIsFilter={setIsFilter}
        />
      );
    }
  };
  const handleVoucherClick = async (rowData: any) => {
    const checkPermissions = getActivePermissionsSession()?.includes(
      AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS,
    );
    if (!checkPermissions) {
      router?.push({
        pathname: AIR_LOYALTY_PROGRAM?.VOUCHER_REDEMPTION_LIST,
        query: { voucherId: rowData?.voucher?._id },
      });
    }
  };
  const handleConsumerClick = async (rowData: any) => {
    router?.push({
      pathname: AIR_LOYALTY_PROGRAM?.UPSERT_CONSUMER,
      query: { consumerId: rowData?.consumer?._id },
    });
  };
  const transactionsPointsListColumn = transactionsPointsColumns(
    handleVoucherClick,
    handleConsumerClick,
  );
  return {
    transactionsPointsListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    setVouchersDrawerContent,
    setPageLimit,
    setPage,
    page,
    pageLimit,
    search,
    getTransactionVouchers,
    handleSearch,
  };
};
