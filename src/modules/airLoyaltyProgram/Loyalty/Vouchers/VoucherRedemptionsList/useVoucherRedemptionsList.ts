import { PAGINATION } from '@/config';
import { useLazyGetVoucherRedemptionListQuery } from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar } from '@/utils/api';
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
  const getVoucherRedemptionListParameter = {
    queryParams: getVoucherRedemptionListParam,
  };

  const [
    lazyGetVoucherRedemptionListTrigger,
    lazyGetVoucherRedemptionListStatus,
  ] = useLazyGetVoucherRedemptionListQuery();
  const voucherRedemptionList =
    lazyGetVoucherRedemptionListStatus?.data?.data?.responses;
  const voucherRedemptionListMetaData =
    lazyGetVoucherRedemptionListStatus?.data?.data?.meta;
  const getVoucherRedemptionListListData = async () => {
    return;
    try {
      await lazyGetVoucherRedemptionListTrigger(
        getVoucherRedemptionListParameter,
      )?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  useEffect(() => {
    getVoucherRedemptionListListData();
  }, [page, pageLimit]);
  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    router,
    voucherRedemptionList,
    voucherRedemptionListMetaData,
    lazyGetVoucherRedemptionListStatus,
    setSearch,
  };
};
