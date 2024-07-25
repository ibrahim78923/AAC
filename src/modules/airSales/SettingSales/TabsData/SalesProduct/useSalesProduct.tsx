import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { columns } from './SalesProduct.data';
import {
  useDeleteSalesProductMutation,
  useGetSalesProductQuery,
} from '@/services/airSales/deals/settings/sales-product';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import useSalesEditorDrawer from './SalesEdItorDrawer/useSalesEditorDrawer';

const useSalesProduct = () => {
  const theme = useTheme<Theme>();
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { handleUserSwitchChange } = useSalesEditorDrawer({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const [deleteSalesProduct, { isLoading: deleteProduct }] =
    useDeleteSalesProductMutation();

  const paramsObj: any = {};
  if (productSearch) paramsObj['search'] = productSearch;
  const query = '&' + new URLSearchParams(paramsObj)?.toString();

  const { data, isLoading, isSuccess } = useGetSalesProductQuery({
    query,
    page,
    pageLimit,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const idsString = selectedCheckboxes?.join(',');

      const response: any = await deleteSalesProduct({
        body: { ids: idsString },
      })?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'Sales Product Deleted Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setSelectedCheckboxes([]);
      setDeleteModalOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const getRowValues = columns({
    selectedCheckboxes,
    setSelectedCheckboxes,
    handleUserSwitchChange,
    data,
  });

  return {
    salesProductData: data?.data,
    handleCloseDeleteModal,
    setSelectedCheckboxes,
    selectedCheckboxes,
    setDeleteModalOpen,
    handleCloseDrawer,
    isDeleteModalOpen,
    setproductSearch,
    setIsDraweropen,
    setIsEditMode,
    productSearch,
    deleteProduct,
    isDraweropen,
    setPageLimit,
    handleDelete,
    getRowValues,
    setAnchorEl,
    handleClose,
    handleClick,
    isEditMode,
    isLoading,
    isSuccess,
    anchorEl,
    setPage,
    theme,
    open,
  };
};

export default useSalesProduct;
