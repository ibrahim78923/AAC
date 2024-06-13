import { useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants';
import {
  useDeleteSmsBroadcastMutation,
  useGetSmsBroadcatsQuery,
} from '@/services/airMarketer/SmsMarketing';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useSMSBroadcast = () => {
  const theme = useTheme<Theme>();
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());
  const [pageLimit, setPageLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    status: '',
    toDate: '',
    fromDate: '',
  });
  const navigate = useRouter();

  const startedDate = 0;
  const endedDate = 1;

  const smsParams = {
    page: page,
    limit: pageLimit,
    search: filterValues?.search,
    status: filterValues?.status ? filterValues?.status : undefined,
    toDate: filterValues?.toDate
      ? dayjs(filterValues?.toDate)?.format(DATE_FORMAT?.API)
      : undefined,
    fromDate: filterValues?.fromDate
      ? dayjs(filterValues?.fromDate)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: smsBroadcastData,
    isLoading,
    isSuccess,
  } = useGetSmsBroadcatsQuery(smsParams);

  const [deleteSmsBroadcast, { isLoading: deleteBroadcastLoading }] =
    useDeleteSmsBroadcastMutation();

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleDelete = () => {
    setSelectedValue(null);
    setIsDelete(true);
  };

  const handleSMSBroadcastDelete = async (id: any) => {
    try {
      await deleteSmsBroadcast({ ids: id })?.unwrap();
      setIsDelete(false);
      setCheckedRows([]);
      enqueueSnackbar(`Broadcast Deleted Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const resetFilters = () => {
    setFilterValues({
      search: '',
      status: '',
      toDate: '',
      fromDate: '',
    });
  };

  const statusTag = (val: any) => {
    switch (val) {
      case 'Completed':
        return theme?.palette?.primary?.main;
      case 'Scheduled':
        return theme?.palette?.warning?.main;
      case 'Draft':
        return theme?.palette?.grey[900];
      case 'Processing':
        return theme?.palette?.success?.main;
      case 'Stopped':
        return theme?.palette?.grey[900];
    }
  };

  return {
    handleSMSBroadcastDelete,
    selectedValue,
    handleDelete,
    handleClose,
    handleClick,
    setIsDelete,
    statusTag,
    navigate,
    isDelete,
    selectedId,
    smsParams,
    setSelectedId,
    theme,
    datePickerVal,
    setDatePickerVal,
    smsBroadcastData,
    setPageLimit,
    setPage,
    isLoading,
    isSuccess,
    filterValues,
    setFilterValues,
    checkedRows,
    setCheckedRows,
    resetFilters,
    deleteSmsBroadcast,
    deleteBroadcastLoading,
    startedDate,
    endedDate,
  };
};

export default useSMSBroadcast;
