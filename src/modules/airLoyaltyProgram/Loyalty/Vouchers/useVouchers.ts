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
import { useState } from 'react';

export const useVouchers = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [addVouchersOpen, setAddVouchersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [switchLoading, setSwitchLoading] = useState<any>({});
  const [filterValues, setFilterValues] = useState<any>({});
  const [printVoucherId, setPrintVoucherId] = useState<any>();
  const theme: any = useTheme();

  const filterBody = {
    dateStart: dayjs(filterValues?.date?.toISOString())?.format(
      CALENDAR_FORMAT?.YMD,
    ),
    dateEnd: dayjs(filterValues?.date?.toISOString())?.format(
      CALENDAR_FORMAT?.YMD,
    ),
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
    isLoading: singleVoucherLoading,
    isFetching: singleVoucherFetching,
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
  const handlePrintVoucher = (id: any) => {
    setPrintVoucherId(id);
    window?.print();
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
    singleVoucherFetching,
    singleVoucherLoading,
    singleVouchers,
  };
};
