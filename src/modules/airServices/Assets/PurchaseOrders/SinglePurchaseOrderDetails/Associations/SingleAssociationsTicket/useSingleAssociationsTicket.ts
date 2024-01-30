import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteAssociationsMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/associations';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useSingleAssociationsTicket = (props: any) => {
  const { associationsItem } = props;
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams.get('id');
  const [showDisassociate, setShowDisassociate] = useState(false);
  const [disassociateModal, setDisassociateModal] = useState(false);
  const [deleteAssociationTrigger, deleteAssociationStatus] =
    useDeleteAssociationsMutation();
  const handleSubmitDissociate = async () => {
    const deleteAssociationParameter = {
      ticketId: associationsItem?._id,
      body: {
        associateOrderId: purchaseOrderId,
      },
    };
    try {
      await deleteAssociationTrigger(deleteAssociationParameter)?.unwrap();
      enqueueSnackbar('Service request disassociate successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDisassociateModal(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const theme: any = useTheme();
  return {
    setShowDisassociate,
    theme,
    showDisassociate,
    setDisassociateModal,
    disassociateModal,
    handleSubmitDissociate,
    associationsItem,
    deleteAssociationStatus,
  };
};
