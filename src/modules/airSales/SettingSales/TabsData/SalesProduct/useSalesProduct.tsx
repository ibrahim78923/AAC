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

const useSalesProduct = () => {
  const theme = useTheme<Theme>();
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const [deleteSalesProduct] = useDeleteSalesProductMutation();

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
  const editRowValue = selectedCheckboxes && selectedCheckboxes[0];

  const handleDelete = async () => {
    try {
      const response: any = await deleteSalesProduct({
        id: editRowValue?._id,
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
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedCheckboxes((prevSelected: any) => [...prevSelected, row]);
    } else {
      setSelectedCheckboxes(
        (prevSelected: any) =>
          prevSelected?.filter((item: any) => item?._id !== row?._id),
      );
    }
  };
  const getRowValues = columns({ handleCheckboxChange, selectedCheckboxes });

  return {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    setPageLimit,
    setPage,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleDelete,
    selectedCheckboxes,
    getRowValues,
    setAnchorEl,
    setSelectedCheckboxes,
    salesProductData: data?.data,
    isLoading,
    isSuccess,
  };
};

export default useSalesProduct;
