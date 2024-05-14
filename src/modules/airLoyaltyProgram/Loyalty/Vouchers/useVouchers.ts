import { PAGINATION } from '@/config';
import { CALENDAR_FORMAT } from '@/constants';
import { VOUCHERS_STATUS } from '@/constants/strings';
import {
  useGetSingleVouchersQuery,
  useGetVouchersQuery,
  usePatchVoucherMutation,
} from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useVouchers = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [addVouchersOpen, setAddVouchersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [switchLoading, setSwitchLoading] = useState<any>({});
  const [filterValues, setFilterValues] = useState<any>({});
  const [printVoucherId, setPrintVoucherId] = useState<any>();
  const [openPrintVoucher, setOpenPrintVoucher] = useState<any>(false);
  const ScreenPosition = { top: 0, left: 0, right: 0, bottom: 0 };
  const ImgPosition = { top: 0, right: 0 };

  const theme: any = useTheme();
  const router = useRouter();
  const filterBody = {
    dateStart:
      filterValues?.date &&
      dayjs(filterValues?.date)?.format(CALENDAR_FORMAT?.YMD),
    dateEnd:
      filterValues?.date &&
      dayjs(filterValues?.date)?.format(CALENDAR_FORMAT?.YMD),
    status: filterValues?.status,
  };
  const vouchersParameter = {
    page: page,
    limit: pageLimit,
    ...filterBody,
    meta: true,
  };
  const [patchVouchersTrigger] = usePatchVoucherMutation();

  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetVouchersQuery(vouchersParameter, {
      refetchOnMountOrArgChange: true,
    });
  const vouchers = data?.data?.vouchers;
  const vouchersMetaData = data?.data?.meta;

  const {
    data: singleVoucherData,
    isLoading: singleIsLoading,
    isFetching: singleISFetching,
  } = useGetSingleVouchersQuery(printVoucherId, {
    refetchOnMountOrArgChange: true,
  });
  const singleVouchers = singleVoucherData?.data;

  const onSwitchChange = async (data: any) => {
    const voucherId = data?._id;
    setSwitchLoading({ ...switchLoading, [voucherId]: true });

    const patchData = {
      id: voucherId,
      body: {
        status:
          data?.status === VOUCHERS_STATUS?.ACTIVE
            ? VOUCHERS_STATUS?.DEACTIVATE
            : VOUCHERS_STATUS?.ACTIVE,
      },
    };

    try {
      await patchVouchersTrigger(patchData)?.unwrap();
      successSnackbar('Status Updated Successfully');
    } catch (error) {
      errorSnackbar();
    } finally {
      setSwitchLoading({ ...switchLoading, [voucherId]: false });
    }
  };
  useEffect(() => {
    if (
      printVoucherId &&
      singleISFetching === false &&
      singleIsLoading === false
    ) {
      window.print();
      setPrintVoucherId(null);
    }
  }, [printVoucherId, singleIsLoading, singleISFetching]);

  const handlePrintVoucher = (id: any) => {
    setPrintVoucherId(id);
  };

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
    isFetching,
    isSuccess,
    isError,
    isLoading,
    onSwitchChange,
    switchLoading,
    setFilterValues,
    filterValues,
    handlePrintVoucher,
    singleVouchers,
    openPrintVoucher,
    setOpenPrintVoucher,
    singleIsLoading,
    router,
    ScreenPosition,
    ImgPosition,
  };
};
