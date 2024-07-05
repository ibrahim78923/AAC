import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetWhatsappBroadcatsByIdQuery,
  useUpdateWhatsappBroadcastMutation,
} from '@/services/airMarketer/whatsapp-marketing';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useBroadcastDetails = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const broadcastId = useSearchParams()?.get('id');
  const [openModalDelete, setOpenModalDelete] = useState({
    isToggle: false,
    recipientId: '',
  });
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
  });

  const { data: getSmsBroadcatsById, isLoading: smsDetailsLoading } =
    useGetWhatsappBroadcatsByIdQuery(broadcastId);
  const smsBroadcastDetails = getSmsBroadcatsById?.data;

  const [updateWhatsappBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateWhatsappBroadcastMutation();

  const handleDeleteRecipient = async (recipientId: any) => {
    try {
      await updateWhatsappBroadcast({
        id: broadcastId,
        body: { recipients: [recipientId], removeRecipients: true },
      })?.unwrap();
      enqueueSnackbar(`Broadcast contact deleted Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    }
  };

  const handleCloseDelete = () => {
    setOpenModalDelete({
      isToggle: false,
      recipientId: '',
    });
  };

  return {
    updateBroadcastLoading,
    handleDeleteRecipient,
    smsBroadcastDetails,
    setOpenModalDelete,
    smsDetailsLoading,
    handleCloseDelete,
    openModalDelete,
    setFilters,
    navigate,
    filters,
    theme,
  };
};

export default useBroadcastDetails;
