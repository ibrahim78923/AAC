import { PAGINATION } from '@/config';
import { useLazyGetVouchersQuery } from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export const useVouchers = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [addVouchersOpen, setAddVouchersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const theme: any = useTheme();
  const getVouchersParam = new URLSearchParams();
  getVouchersParam?.append('page', page + '');
  getVouchersParam?.append('limit', pageLimit + '');
  const getVouchersParameter = {
    queryParams: getVouchersParam,
  };

  const [lazyGetVouchersTrigger, lazyGetVouchersStatus] =
    useLazyGetVouchersQuery();
  const vouchers = lazyGetVouchersStatus?.data?.data?.responses;
  const vouchersMetaData = lazyGetVouchersStatus?.data?.data?.meta;
  const getVouchersListData = async () => {
    return;
    try {
      await lazyGetVouchersTrigger(getVouchersParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  useEffect(() => {
    getVouchersListData();
  }, [page, pageLimit]);
  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    addVouchersOpen,
    setAddVouchersOpen,
    filtersOpen,
    theme,
    setFiltersOpen,
    vouchers,
    vouchersMetaData,
    lazyGetVouchersStatus,
  };
};
