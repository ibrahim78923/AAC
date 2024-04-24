import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useTickets = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [ticketRecord, setTicketRecord] = useState<any>({});

  const [deleteAssociation, { isLoading: delTicketLoading }] =
    useDeleteAssociationMutation();

  const deleteTicketHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          // quoteId: selectedQuote?._id,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return {
    deleteTicketHandler,
    handleCloseAlert,
    delTicketLoading,
    setTicketRecord,
    setIsOpenAlert,
    setSearchName,
    setOpenDrawer,
    ticketRecord,
    isOpenAlert,
    searchName,
    openDrawer,
    theme,
  };
};

export default useTickets;
