import { useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { AIR_MARKETER } from '@/routesConstants/paths';
import {
  useDeleteSmsBroadcastMutation,
  useGetSmsBroadcatsQuery,
} from '@/services/airMarketer/SmsMarketing';

const useSMSBroadcast = () => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    status: '',
    toDate: '',
    fromDate: '',
  });
  const theme = useTheme<Theme>();
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

  const [deleteSmsBroadcast] = useDeleteSmsBroadcastMutation();

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleDelete = () => {
    setSelectedValue(null);
    setIsDelete(true);
  };

  const handleEdit = () => {
    setSelectedValue(null);
    navigate.push({
      pathname: AIR_MARKETER?.CREATE_SMS_BROADCAST,
      query: { type: 'edit' },
    });
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
    selectedValue,
    handleDelete,
    handleClose,
    handleClick,
    handleEdit,
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
    // handleDateFilter
    startedDate,
    endedDate,
  };
};

export default useSMSBroadcast;
