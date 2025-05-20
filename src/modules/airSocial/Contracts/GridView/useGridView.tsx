import { PAGINATION } from '@/config';
import { CONTRACTS_STATUS } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useGetCommonContractsListQuery,
  usePostSendReminderMutation,
} from '@/services/commonFeatures/contracts/contracts-dashboard';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export default function useGridView({
  tabValue,
  activeFolder,
  filterParams,
}: any) {
  const theme = useTheme();

  const [isViewAllActivityDrawerOpen, setIsViewAllActivityDrawerOpen] =
    useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  useEffect(() => {
    setPage(PAGINATION?.CURRENT_PAGE);
  }, [filterParams, tabValue]);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetCommonContractsListQuery(
      {
        page,
        limit: pageLimit,
        folderId: activeFolder?._id,
        ...(tabValue !== CONTRACTS_STATUS?.ALL && { status: tabValue }),
        ...filterParams,
      },
      { skip: !activeFolder?._id },
    );

  const [postSendReminder, { isLoading: loadingSendReminder }] =
    usePostSendReminderMutation();

  const handlePostSendReminder = async (contractId: string) => {
    try {
      await postSendReminder(contractId)?.unwrap();
      successSnackbar('Reminder sent successfully!');
      setIsViewAllActivityDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(
        `An error occured: ${error?.data?.message || 'Unknown error'}`,
      );
    }
  };

  return {
    isViewAllActivityDrawerOpen,
    setIsViewAllActivityDrawerOpen,
    data,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
    theme,
    handlePostSendReminder,
    loadingSendReminder,
  };
}
