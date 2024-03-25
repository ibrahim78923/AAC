import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteDealsPipelineMutation,
  useGetDealsPipelineQuery,
  usePostDealsPipelineMutation,
  useUpdateDealsPipelineMutation,
} from '@/services/airSales/deals/settings/deals-pipeline';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useDealPipelines = () => {
  const theme = useTheme<Theme>();
  const [isDraweropen, setIsDraweropen] = useState({
    isToggle: false,
    type: 'add',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isDisableButton, setDisableButton] = useState(false);
  const [isdefaultValue, setdefaultValue] = useState(false);
  const [checkedDeal, setCheckedDeal] = useState<string[]>([]);

  const [postDealsPipeline, { isLoading: postDealLoading }] =
    usePostDealsPipelineMutation();
  const [deleteDealsPipeline, { isLoading: deleteDealLoading }] =
    useDeleteDealsPipelineMutation();
  const [updateDealsPipeline] = useUpdateDealsPipelineMutation();

  const paramsObj: any = {};
  if (productSearch) paramsObj['search'] = productSearch;
  const query = '&' + new URLSearchParams(paramsObj)?.toString();

  const { data, isLoading } = useGetDealsPipelineQuery({
    query,
    meta: false,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDrawer = () => {
    setIsDraweropen({ isToggle: false, type: '' });
  };

  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.pipelineName,
      isDefault: values?.defaultPipeline,
      dealStages: values?.dealStages,
    };

    try {
      if (isDraweropen?.type === 'add') {
        await postDealsPipeline({ body: payload })?.unwrap();
      } else {
        await updateDealsPipeline({ id: checkedDeal, body: payload });
      }
      setIsDraweropen({ isToggle: false, type: '' });
      enqueueSnackbar(
        `Pipeline has been ${
          isDraweropen?.type === 'edit' ? 'Updated' : 'Created'
        } Successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // check box function

  const handleSelectDealsById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedDeal([...checkedDeal, id]);
    } else {
      setCheckedDeal(checkedDeal?.filter((_id: any) => _id !== id));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDealsPipeline({ ids: checkedDeal }).unwrap();
      setCheckedDeal([]);
      setDeleteModalOpen(false);
      enqueueSnackbar('Deal Pipeline has been Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const disabled: { [key: number]: boolean } = {
    0: true,
    1: true,
    2: true,
  };

  return {
    dealPipelinesData: data?.data,
    handleCloseDeleteModal,
    handleSelectDealsById,
    setDeleteModalOpen,
    isDeleteModalOpen,
    handleCloseDrawer,
    deleteDealLoading,
    setproductSearch,
    setIsDraweropen,
    setDisableButton,
    postDealLoading,
    setCheckedDeal,
    isDisableButton,
    isDraweropen,
    setIsEditMode,
    productSearch,
    isdefaultValue,
    handleDelete,
    checkedDeal,
    handleClose,
    isEditMode,
    handleClick,
    setAnchorEl,
    setdefaultValue,
    onSubmit,
    isLoading,
    disabled,
    anchorEl,
    theme,
    open,
  };
};

export default useDealPipelines;
