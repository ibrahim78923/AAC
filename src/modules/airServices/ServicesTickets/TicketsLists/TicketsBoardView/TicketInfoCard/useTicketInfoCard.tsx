import { DATE_FORMAT } from '@/constants';
import { useDeleteTicketsMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useTicketInfoCard({ details }: any) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<any>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const theme: any = useTheme();

  const router = useRouter();

  const OPEN = 'OPEN';
  const openTimeDiff = dayjs(details?.plannedEndDate)?.diff(dayjs(), 'hour');
  const openMessage =
    openTimeDiff >= 0
      ? `Due in ${openTimeDiff}h`
      : `Due by ${dayjs(details?.plannedEndDate)?.format(DATE_FORMAT?.UI)}`;
  const RESOLVED = 'RESOLVED';
  const resolvedTimeDiff = dayjs(details?.resolvedAt)?.diff(dayjs(), 'hour');
  const resolvedMessage =
    resolvedTimeDiff >= 0
      ? `Resolved: ${resolvedTimeDiff}h ago`
      : `Resolved: ${dayjs(details?.resolvedAt)?.format(DATE_FORMAT?.UI)}`;
  const PENDING = 'PENDING';
  const pendingTimeDiff = dayjs(details?.plannedEndDate)?.diff(dayjs(), 'hour');
  const pendingMessage =
    pendingTimeDiff >= 0
      ? `Due in ${pendingTimeDiff}h ago`
      : `Due by ${dayjs(details?.plannedEndDate)?.format(DATE_FORMAT?.UI)}`;
  const CLOSED = 'CLOSED';
  const closedTimeDiff = dayjs(details?.closedAt)?.diff(dayjs(), 'hour');
  const closedMessage =
    closedTimeDiff >= 0
      ? `Closed: ${closedTimeDiff}h ago`
      : `Closed: ${dayjs(details?.closedAt)?.format(DATE_FORMAT?.UI)}`;

  const truncatedSubject = details?.subject
    ? details?.subject.length > 60
      ? `${details.subject.slice(0, 60)}...`
      : details?.subject
    : '-';

  const [deleteTicketsTrigger, deleteTicketsStatus] =
    useDeleteTicketsMutation();

  const handleSubmitDelete = async () => {
    const deleteTicketsParameter = {
      queryParams: `Ids=${deleteId}`,
    };
    try {
      await deleteTicketsTrigger(deleteTicketsParameter)?.unwrap();
      successSnackbar('Ticket Deleted Successfully!');
      setDeleteId(null);
      setOpenDeleteModal(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message?.error ?? 'Something Went Wrong!');
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
    OPEN,
    openMessage,
    RESOLVED,
    resolvedMessage,
    PENDING,
    pendingMessage,
    CLOSED,
    closedMessage,
    truncatedSubject,
    setDeleteId,
    handleSubmitDelete,
    deleteTicketsStatus,
  };
}
