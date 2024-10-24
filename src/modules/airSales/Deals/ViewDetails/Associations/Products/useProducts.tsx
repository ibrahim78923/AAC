import { useState } from 'react';

import { useTheme } from '@mui/material';
import {
  useDeleteAssociationMutation,
  useGetAssociateProductsQuery,
  useUpdateAssociateProductMutation,
} from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useProducts = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [updateAssociateProduct] = useUpdateAssociateProductMutation();
  const { data: getDealsAssociateProducts, isLoading: loadingProducts } =
    useGetAssociateProductsQuery({
      id: dealId,
      params: { search: searchName ? searchName : undefined },
    });

  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      await updateAssociateProduct({
        id: dealId,
        body: {
          productId: productId,
          quantity: quantity,
        },
      })?.unwrap();
      enqueueSnackbar('Product Quantity Updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
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

  const [deleteAssociation, { isLoading: productLoading }] =
    useDeleteAssociationMutation();

  const deleteProductHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          product: { productId: selectedProduct?.productId },
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
    searchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    selectedProduct,
    setSelectedProduct,
    productLoading,
    deleteProductHandler,
    handleQuantityChange,
    getDealsAssociateProducts,
    loadingProducts,
  };
};

export default useProducts;
