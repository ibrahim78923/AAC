import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useLazyGetTaskByIdQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';
import { tasksTableColumns } from './Tasks.data';

export const useTasks = () => {
  const theme = useTheme();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<any>(0);
  const [activeCheck, setActiveCheck] = useState<any>([]);
  const searchParams = useSearchParams();
  const ticketId = searchParams?.get?.('ticketId');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getTaskParam = new URLSearchParams();
  getTaskParam?.append('page', page + '');
  getTaskParam?.append('limit', pageLimit + '');
  const getTaskParameter = {
    queryParams: getTaskParam,
    id: ticketId,
  };
  const [
    lazyGetTicketsTrigger,
    { data, isLoading, isError, isFetching, isSuccess },
  ] = useLazyGetTaskByIdQuery();
  const tableData = data?.data?.tasks;
  const meta = data?.data?.meta;
  const getTaskListData = async () => {
    try {
      await lazyGetTicketsTrigger(getTaskParameter)?.unwrap();
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'An error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
        autoHideDuration: 2000,
      });
    }
  };
  if (tableData && tableData.length === 0) {
    enqueueSnackbar('No task available', {
      variant: NOTISTACK_VARIANTS?.INFO,
      autoHideDuration: 2000,
    });
  }
  useEffect(() => {
    getTaskListData();
  }, [page, pageLimit]);
  const tableColumn = tasksTableColumns(
    activeCheck,
    setActiveCheck,
    setIsDetailDrawerOpen,
    theme,
    tableData,
  );
  return {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    activeCheck,
    setActiveCheck,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    tableColumn,
    tableData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    setPageLimit,
    pageLimit,
    page,
    setPage,
    meta,
  };
};
