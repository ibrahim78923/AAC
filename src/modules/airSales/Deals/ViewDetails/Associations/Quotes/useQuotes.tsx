import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useQuotes = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<any>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const { data: getQuoteById, isLoading: quoteDetailsLoading } =
    useGetQuoteByIdQuery({ id: selectedQuote?._id, params: searchName });

  const quotesDetails = getQuoteById?.data;

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

  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    selectedQuote,
    setSelectedQuote,
    deleteQuoteHandler,
    quoteLoading,
    quotesDetails,
    quoteDetailsLoading,
  };
};

export default useQuotes;
