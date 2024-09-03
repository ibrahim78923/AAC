import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Theme, useTheme } from '@mui/material';
import {
  useGetSmsBroadcatsByIdQuery,
  useUpdateSmsBroadcastMutation,
} from '@/services/airMarketer/SmsMarketing';
import { MEETINGS_DETAILS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

const useSMSBroadcastDetails = (detailsData?: any) => {
  const theme = useTheme<Theme>();
  const broadcastId = useSearchParams()?.get('id');
  const { data: getSmsBroadcatsById, isLoading: smsDetailsLoading } =
    useGetSmsBroadcatsByIdQuery(broadcastId);
  const smsBroadcastDetails = getSmsBroadcatsById?.data;

  const [openModalDelete, setOpenModalDelete] = useState({
    isToggle: false,
    recipientId: '',
  });

  const [filters, setFilters] = useState({
    search: '',
    status: MEETINGS_DETAILS_TYPE?.ALL_MEETINGS,
  });

  const [updateSmsBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateSmsBroadcastMutation();

  const handleDeleteRecipient = async (recipientId: any) => {
    try {
      await updateSmsBroadcast({
        id: broadcastId,
        body: { recipients: [recipientId], removeRecipients: true },
      })?.unwrap();
      enqueueSnackbar(`Broadcast contact deleted Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCloseDelete = () => {
    setOpenModalDelete({
      isToggle: false,
      recipientId: '',
    });
  };

  const updatedRecords = detailsData?.recipients?.filter((item: any) => {
    if (filters?.search) {
      return item?.firstName
        ?.toLowerCase()
        ?.includes(filters?.search?.toLowerCase());
    } else if (filters?.status) {
      if (filters?.status === MEETINGS_DETAILS_TYPE?.ALL_MEETINGS) {
        return true;
      } else {
        return item?.messageStatus === filters?.status;
      }
    } else {
      return true;
    }
  });

  return {
    updateBroadcastLoading,
    handleDeleteRecipient,
    smsBroadcastDetails,
    setOpenModalDelete,
    handleCloseDelete,
    smsDetailsLoading,
    openModalDelete,
    updatedRecords,
    setFilters,
    filters,
    theme,
  };
};

export default useSMSBroadcastDetails;
