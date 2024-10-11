import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  productFeaturesValidationSchema,
  addProductFeatureFormDefaultValues,
  editFeatureFormDefaultValues,
  editFeatureValidationSchema,
} from './ProductFeatures.data';
import {
  useGetProductFeatureQuery,
  usePostProductFeatureMutation,
  useUpdateProductFeatureMutation,
  useLazyGetProductFeatureProductListQuery,
} from '@/services/superAdmin/settings/product-feature';
import { PAGINATION } from '@/config';

const useProductFeature = () => {
  const productsDropdownList = useLazyGetProductFeatureProductListQuery();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [rowId, setRowId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (rowId) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rowId]);

  // Get Product Features Data
  const [searchValue, setSearchValue] = useState(null);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataProductFeatures, isLoading: loagingProductFeatures } =
    useGetProductFeatureQuery({
      params: { ...searchPayLoad, ...paginationParams },
    });

  // Add New Feature
  const [postAddFeature, { isLoading: loadingAddFeature }] =
    usePostProductFeatureMutation();
  const [openDrawerAddFeature, setOpenDrawerAddFeature] = useState(false);
  const methodsAddFeature = useForm({
    resolver: yupResolver(productFeaturesValidationSchema),
    defaultValues: addProductFeatureFormDefaultValues,
  });

  const { handleSubmit: handleMethodAddFaq, reset: resetAddFeatureForm } =
    methodsAddFeature;

  const handleOpenDrawerAddFeature = () => {
    setOpenDrawerAddFeature(true);
  };
  const handleCloseDrawerAddFeature = () => {
    setOpenDrawerAddFeature(false);
    resetAddFeatureForm();
  };

  const onSubmitAddFeature = async (values: any) => {
    const payload = {
      productIds: values?.productIds.map((item: any) => item?._id),
      name: values?.name,
      description: values?.description,
    };

    try {
      await postAddFeature({ body: payload })?.unwrap();
      handleCloseDrawerAddFeature();
      enqueueSnackbar('Feature added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddFeatureSubmit = handleMethodAddFaq(onSubmitAddFeature);

  // Edit Feature
  const [postUpdateFeature, { isLoading: loadingEditFeature }] =
    useUpdateProductFeatureMutation();
  const [openDrawerEditFeature, setOpenDrawerEditFeature] = useState(false);
  const methodsEditFeature = useForm({
    resolver: yupResolver(editFeatureValidationSchema),
    defaultValues: editFeatureFormDefaultValues,
  });

  const { handleSubmit: handleMethodEditFaq } = methodsEditFeature;
  const handleOpenDrawerEditFeature = () => {
    handleActionMenuClose();
    const selectedItem = dataProductFeatures?.data?.productfeatures?.find(
      (item: any) => item?._id === rowId,
    );
    if (selectedItem) {
      const productObj: any = {
        _id: selectedItem?.productId,
        name: selectedItem?.productName,
      };
      methodsEditFeature.setValue('productId', productObj);
      methodsEditFeature.setValue('name', selectedItem?.name);
      methodsEditFeature.setValue('description', selectedItem?.description);
    }
    setOpenDrawerEditFeature(true);
  };
  const handleCloseDrawerEditFeature = () => {
    setOpenDrawerEditFeature(false);
  };

  const onSubmitEditFeature = async (values: any) => {
    const payload = {
      productId: values?.productId?._id,
      name: values?.name,
      description: values?.description,
    };
    try {
      await postUpdateFeature({ id: rowId, body: payload })?.unwrap();
      handleCloseDrawerEditFeature();
      enqueueSnackbar('Feature updated successfully', {
        variant: 'success',
      });
      setRowId(null);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleEditFeatureSubmit = handleMethodEditFaq(onSubmitEditFeature);

  // Update Product Features Status
  const handleUpdateStatus = async (status: string, id: any) => {
    const payLoad = {
      status: status,
    };
    try {
      await postUpdateFeature({ id: id, body: payLoad })?.unwrap();
      enqueueSnackbar(`Product feature is ${status} now`, {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    productsDropdownList,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionMenuClose,
    isDisabled,
    rowId,
    setRowId,
    dataProductFeatures,
    loagingProductFeatures,
    setPageLimit,
    setPage,
    setSearchValue,
    openDrawerAddFeature,
    handleOpenDrawerAddFeature,
    handleCloseDrawerAddFeature,
    methodsAddFeature,
    handleAddFeatureSubmit,
    loadingAddFeature,
    loadingEditFeature,
    openDrawerEditFeature,
    handleOpenDrawerEditFeature,
    handleCloseDrawerEditFeature,
    handleEditFeatureSubmit,
    methodsEditFeature,
    handleUpdateStatus,
  };
};
export default useProductFeature;
