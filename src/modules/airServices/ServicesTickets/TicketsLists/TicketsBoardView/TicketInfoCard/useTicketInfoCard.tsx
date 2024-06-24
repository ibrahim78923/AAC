import { DATE_FORMAT } from '@/constants';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useTicketInfoCard({
  details,
  setPage,
  totalRecords,
  getValueTicketsListData,
  page,
}: any) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<any>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const theme: any = useTheme();

  const router = useRouter();

  const timeFormatMessage = (
    timeDiff: any,
    date: any,
    messagePassed: string,
    messageDue: string,
  ) => {
    let message;

    if (timeDiff < 0) {
      message = `${messagePassed} ${date?.format(DATE_FORMAT?.UI)}`;
    } else if (timeDiff < 24) {
      message = `${messageDue} ${timeDiff}h`;
    } else {
      const timeDiffDays = date?.diff(now, 'day');
      if (timeDiffDays <= 30) {
        message = `${messageDue} ${timeDiffDays} day(s)`;
      } else {
        message = `${messageDue} ${date?.format(DATE_FORMAT?.UI)}`;
      }
    }
    return message;
  };

  const plannedEndDate = dayjs(details?.plannedEndDate);
  const now = dayjs();
  const resolvedAt = dayjs(details?.resolvedAt);
  const closedAt = dayjs(details?.closedAt);

  // Open Status
  const openTimeDiff = plannedEndDate?.diff(now, 'hour');
  const openMessage = timeFormatMessage(
    openTimeDiff,
    plannedEndDate,
    'Was Due Till',
    'Due in',
  );

  // Resolved Status
  const resolvedTimeDiff = resolvedAt?.diff(now, 'hour');
  const resolvedMessage = timeFormatMessage(
    resolvedTimeDiff,
    plannedEndDate,
    'Resolved:',
    'Resolved:',
  );

  // Pending Status
  const pendingTimeDiff = plannedEndDate?.diff(now, 'hour');
  const pendingMessage = timeFormatMessage(
    pendingTimeDiff,
    plannedEndDate,
    'Was Due Till',
    'Due in',
  );

  // Closed Status
  const closedTimeDiff = closedAt?.diff(now, 'hour');
  const closedMessage = timeFormatMessage(
    closedTimeDiff,
    plannedEndDate,
    'Closed:',
    'Closed:',
  );

  const [deleteTicketsTrigger, deleteTicketsStatus] =
    useDeleteTicketsMutation();

  const handleSubmitDelete = async () => {
    const deleteTicketsParameter = {
      queryParams: `Ids=${deleteId}`,
    };
    try {
      await deleteTicketsTrigger(deleteTicketsParameter)?.unwrap();
      successSnackbar('Ticket deleted successfully');
      const newPage = totalRecords === 1 ? 1 : page;
      setPage?.(newPage);
      setOpenDeleteModal(false);
      await getValueTicketsListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setOpenDeleteModal(false);
    }
  };

  return {
    openDeleteModal,
    setOpenDeleteModal,
    open,
    anchorEl,
    setAnchorEl,
    id,
    theme,
    router,
    openMessage,
    resolvedMessage,
    pendingMessage,
    closedMessage,
    setDeleteId,
    handleSubmitDelete,
    deleteTicketsStatus,
  };
}
