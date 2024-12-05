import { PAGINATION } from '@/config';
import { useLazyGetVoucherRedemptionListQuery } from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useVoucherRedemptionsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const getVoucherRedemptionListParam = new URLSearchParams();
  getVoucherRedemptionListParam?.append('page', page + '');
  getVoucherRedemptionListParam?.append('limit', pageLimit + '');
  getVoucherRedemptionListParam?.append('search', search);
  getVoucherRedemptionListParam?.append(
    'id',
    router?.query?.voucherId as string,
  );
  const [
    lazyGetVoucherRedemptionListTrigger,
    lazyGetVoucherRedemptionListStatus,
  ] = useLazyGetVoucherRedemptionListQuery();
  const getVoucherRedemptionListListData = async () => {
    try {
      await lazyGetVoucherRedemptionListTrigger(
        getVoucherRedemptionListParam,
      )?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
  useEffect(() => {
    getVoucherRedemptionListListData();
  }, [page, pageLimit, search]);
  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    router,
    lazyGetVoucherRedemptionListStatus,
    handleSearch,
  };
};
