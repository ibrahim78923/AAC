import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useProducts = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation, { isLoading: productLoading }] =
    useDeleteAssociationMutation();

  const deleteProductHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          product: { productId: selectedProduct?._id },
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
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    selectedProduct,
    setSelectedProduct,
    productLoading,
    deleteProductHandler,
  };
};

export default useProducts;
