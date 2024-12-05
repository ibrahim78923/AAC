import { useEffect, useState } from 'react';
import { transactionsPointsColumns } from './TransactionVouchers.data';
import { PAGINATION } from '@/config';
import { TransactionVouchersFilter } from './TransactionVouchersFilter';
import { getActivePermissionsSession } from '@/utils';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { useLazyGetVoucherTransactionsListQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';
import { filteredEmptyValues } from '@/utils/api';

export const useTransactionVouchers = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isFilter, setIsFilter] = useState<any>({});
  const router = useRouter();
  const [getTransactionVouchersTrigger, getTransactionVouchers] =
    useLazyGetVoucherTransactionsListQuery<any>();
  const modifiedFilter = {
    voucherId: isFilter?.voucherRedeemed?._id,
    consumerId: isFilter?.consumer?._id,
    dateStart:
      isFilter?.dateRange?.startDate &&
      otherDateFormat(isFilter?.dateRange?.startDate, CALENDAR_FORMAT?.YMD),
    dateEnd:
      isFilter?.dateRange?.endDate &&
      otherDateFormat(isFilter?.dateRange?.endDate, CALENDAR_FORMAT?.YMD),
  };
  const handleTransactionVouchers = async () => {
    const queryParams = {
      page,
      limit: pageLimit,
      search,
      ...modifiedFilter,
    };
    const filterValues = filteredEmptyValues?.(queryParams);
    await getTransactionVouchersTrigger(filterValues);
  };
  useEffect(() => {
    handleTransactionVouchers();
  }, [page, pageLimit, search, isFilter]);
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
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
