import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteWhatsAppBroadcastMutation,
  useGetWhatsAppBroadcatsQuery,
} from '@/services/airMarketer/whatsapp-marketing';
import { Theme, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useBroadcast = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());
  const [actionsEl, setActionsEl] = useState(null);
  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    status: 'status',
    toDate: '',
    fromDate: '',
  });
  const [recordStatus, setRecordStatus] = useState<any>(null);
  const actionsMenuOpen = Boolean(actionsEl);

  const startedDate = 0;
  const endedDate = 1;

  const whatsappParams = {
    page: page,
    limit: pageLimit,
    search: filterValues?.search,
    status:
      filterValues?.status !== 'status' ? filterValues?.status : undefined,
    toDate: filterValues?.toDate
      ? dayjs(filterValues?.toDate)?.format(DATE_FORMAT?.API)
      : undefined,
    fromDate: filterValues?.fromDate
      ? dayjs(filterValues?.fromDate)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: whatsAppBroadcastData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetWhatsAppBroadcatsQuery(whatsappParams);
  const broadcastsData = whatsAppBroadcastData?.data?.whatsappbroadcasts;

  const [deleteSmsBroadcast, { isLoading: deleteBroadcastLoading }] =
    useDeleteWhatsAppBroadcastMutation();

  const handleSMSBroadcastDelete = async (id: any) => {
    try {
      await deleteSmsBroadcast(id)?.unwrap();
      setOpenModalDelete(false);
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

  // Actions Dropdown
  const handleActionsMenuClick = (event: any) => {
    setActionsEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setActionsEl(null);
  };

  // Delete Modal
  const handleCloseDelete = () => {
    setSelectedValue(null);
    setOpenModalDelete(false);
  };

  const handleOpenDelete = () => {
    setSelectedValue(null);
    setOpenModalDelete(true);
  };

  const resetFilters = () => {
    setFilterValues({
      search: '',
      status: 'status',
      toDate: '',
      fromDate: '',
    });
  };

  return {
    handleSMSBroadcastDelete,
    handleActionsMenuClick,
    handleActionsMenuClose,
    deleteBroadcastLoading,
    whatsAppBroadcastData,
    handleCloseDelete,
    setDatePickerVal,
    handleOpenDelete,
    actionsMenuOpen,
    openModalDelete,
    setRecordStatus,
    setFilterValues,
    broadcastsData,
    setCheckedRows,
    datePickerVal,
    filterValues,
    resetFilters,
    selectedValue,
    setPageLimit,
    checkedRows,
    recordStatus,
    startedDate,
    actionsEl,
    endedDate,
    pageLimit,
    isLoading,
    isSuccess,
    navigate,
    setPage,
    theme,
    page,
    isFetching,
  };
};

export default useBroadcast;
