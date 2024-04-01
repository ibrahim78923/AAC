import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';

const useQuotes = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<any>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation, { isLoading: quoteLoading }] =
    useDeleteAssociationMutation();

  const deleteQuoteHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          quoteId: selectedQuote?._id,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', { variant: 'success' });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    selectedQuote,
    setSelectedQuote,
    deleteQuoteHandler,
    quoteLoading,
  };
};

export default useQuotes;
