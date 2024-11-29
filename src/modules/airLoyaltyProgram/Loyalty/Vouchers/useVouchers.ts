import { PAGINATION } from '@/config';
import { CALENDAR_FORMAT } from '@/constants';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import { otherDateFormat } from '@/lib/date-time';
import {
  useDeleteVoucherMutation,
  useGetVouchersQuery,
} from '@/services/airLoyaltyProgram/loyalty/vouchers';
import { getActivePermissionsSession } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useVouchers = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterValues, setFilterValues] = useState<any>({});
  const [isPortal, setIsPortal] = useState<any>({});

  const router = useRouter();
  const filterBody = {
    dateStart:
      filterValues?.dateStart &&
      otherDateFormat(filterValues?.dateStart, CALENDAR_FORMAT?.YMD),
    status: filterValues?.status,
  };
  const vouchersParameter = {
    page: page,
    limit: pageLimit,
    ...filterBody,
    meta: true,
  };
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetVouchersQuery(vouchersParameter, {
      refetchOnMountOrArgChange: true,
    });
  const vouchers = data?.data?.vouchers;
  const vouchersMetaData = data?.data?.meta;

  const handleVoucherClick = async (data: any) => {
    const checkPermissions = getActivePermissionsSession()?.includes(
      AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS,
    );
    if (checkPermissions) {
      router?.push({
        pathname: AIR_LOYALTY_PROGRAM?.VOUCHER_REDEMPTION_LIST,
        query: { voucherId: data?._id },
      });
    }
  };
  const [deleteVoucherTrigger, deleteVoucherStatus] =
    useDeleteVoucherMutation();
  const handleDeleteSubmit = async () => {
    try {
      await deleteVoucherTrigger(isPortal?.id)?.unwrap();
      setIsPortal({});
      successSnackbar('Voucher Deleted Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleEditVoucher = (rowData: any) => {
    setIsPortal({ id: rowData?._id, upsert: true });
  };
  const handleDeleteVoucher = (rowData: any) => {
    setIsPortal({ id: rowData?._id, delete: true });
  };
  const checkActionPermissions = getActivePermissionsSession()?.includes(
    AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.EDIT_DELETE,
  );

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    vouchersMetaData,
    isFetching,
    isSuccess,
    isError,
    isLoading,
    vouchers,
    handleVoucherClick,
    setFilterValues,
    filterValues,
    handleEditVoucher,
    handleDeleteVoucher,
    isPortal,
    setIsPortal,
    handleDeleteSubmit,
    checkActionPermissions,
    deleteVoucherStatus,
  };
};
