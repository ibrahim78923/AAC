import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  ProductCategoryDefaultValues,
  ProductCategoryvalidationSchema,
} from './SalesProductCategories.data';
import {
  useGetSalesProductCategoriesQuery,
  usePostSalesProductCategoriesMutation,
  useUpdateSalesProductCategoriesMutation,
} from '@/services/orgAdmin/settings/sales-product-category';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useSalesProductCategories = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState([]);
  const [postSalesProductCategories, { isLoading: loadingAdd }] =
    usePostSalesProductCategoriesMutation();
  const [editData, setEditData] = useState<any>({});
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const params = {
    page: page,
    limit: pageLimit,
    ...(productSearch && { search: productSearch }),
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetSalesProductCategoriesQuery({ params });

  const [updateSalesProductCategories, { isLoading: loadingUpdate }] =
    useUpdateSalesProductCategoriesMutation();
  // const [userStatus, setUserStatus] = useState('active');
  const theme = useTheme<Theme>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    reset(ProductCategoryvalidationSchema);
    setEditData({});
    setIsDraweropen(false);
  };

  const ProductCategory: any = useForm({
    resolver: yupResolver(ProductCategoryvalidationSchema),
    defaultValues: async () => {
      if (editData) {
        const { name, description } = editData;
        if (!isNullOrEmpty(Object?.keys(editData))) {
          return {
            name,
            description,
          };
        }
      }
      return ProductCategoryDefaultValues;
    },
  });
  useEffect(() => {
    if (editData) {
      const { name, description } = editData;
      ProductCategory.setValue('name', name);
      ProductCategory.setValue('description', description);
    }
  }, [editData, ProductCategory]);

  const { handleSubmit, reset } = ProductCategory;
  const onSubmit = async (data: any) => {
    const salesProductCartegoryData = {
      name: data?.name,
      description: data?.description,
    };
    if (isNullOrEmpty(data?.description)) {
      delete salesProductCartegoryData.description;
    }
    try {
      if (Object?.keys(editData)[0]) {
        await updateSalesProductCategories({
          body: salesProductCartegoryData,
          id: editData?._id,
        })?.unwrap();
        setIsDraweropen(false);
        enqueueSnackbar('Categories Updated Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
      } else {
        await postSalesProductCategories({
          body: salesProductCartegoryData,
        })?.unwrap();
        enqueueSnackbar('Product Added Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        reset(ProductCategoryvalidationSchema);
        setIsDraweropen(false);
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const getRowValues = columns({
    updateSalesProductCategories,
    setIsGetRowValues,
    isGetRowValues,
    setIsChecked,
    setEditData,
    theme,
  });

  return {
    tableRow: data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    ProductCategory,
    handleSubmit,
    onSubmit,
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
    getRowValues,
    setPage,
    setPageLimit,
    loadingAdd,
    loadingUpdate,
  };
};

export default useSalesProductCategories;
