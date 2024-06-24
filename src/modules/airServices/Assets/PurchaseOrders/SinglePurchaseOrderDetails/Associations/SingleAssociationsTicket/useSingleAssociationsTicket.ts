import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import { usePostRemoveAssociateTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/association';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useSingleAssociationsTicket = (props: any) => {
  const { associationsItem } = props;

  const theme: any = useTheme();

  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams.get('purchaseOrderId');
  const [showDisassociate, setShowDisassociate] = useState(false);
  const [disassociateModal, setDisassociateModal] = useState(false);

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostRemoveAssociateTicketsMutation();

  const handleSubmitDissociate = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: purchaseOrderId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.PURCHASE_ORDER,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        ticketsIds: [associationsItem?._id],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket Detached Successfully!');
      setDisassociateModal(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDisassociateModal(false);
    }
  };

  return {
    setShowDisassociate,
    theme,
    showDisassociate,
    setDisassociateModal,
    disassociateModal,
    handleSubmitDissociate,
    associationsItem,
    postRemoveAssociateTicketsStatus,
  };
};
