import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  dealPipelinesDefaultValues,
  dealPipelinesvalidationSchema,
} from './DealPipelines.data';

import {
  useGetDealsPipelineQuery,
  usePostDealsPipelineMutation,
} from '@/services/airSales/deals/settings/deals-pipeline';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useDealPipelines = () => {
  const theme = useTheme<Theme>();
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isDisableButton, setDisableButton] = useState(false);
  const [isdefaultValue, setdefaultValue] = useState(false);
  const [inputFields, setInputFields] = useState([
    { name: '', probability: null },
  ]);

  const [postDealsPipeline] = usePostDealsPipelineMutation();

  const paramsObj: any = {};
  if (productSearch) paramsObj['search'] = productSearch;
  const query = '&' + new URLSearchParams(paramsObj)?.toString();

  const { data, isLoading } = useGetDealsPipelineQuery({
    query,
    page: PAGINATION?.CURRENT_PAGE,
    pageLimit: PAGINATION?.PAGE_LIMIT,
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
    setIsDraweropen(false);
  };

  const dealPipelines = useForm({
    resolver: yupResolver(dealPipelinesvalidationSchema),
    defaultValues: dealPipelinesDefaultValues,
  });
  const { handleSubmit } = dealPipelines;
  const onSubmit = async (values: any) => {
    const payload = {
      name: values.pipelineName,
      isDefault: values?.defaultPipeline,
      dealStages: inputFields,
    };

    try {
      await postDealsPipeline({ body: payload })?.unwrap();
      enqueueSnackbar('Record Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
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

  const handleDelete = () => {
    setDeleteModalOpen(false);
  };

  const getCheckbox = (event: any, value: any) => {
    setDisableButton(event?.target?.checked);
    setdefaultValue(value === 'default');
  };

  const addField = () => {
    setInputFields([...inputFields, { name: '', probability: null }]);
  };
  const deleteField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const handleChangeInput = (index: any, event: any) => {
    const values = [...inputFields];
    values[index][event?.target?.name] = event?.target?.value;
    setInputFields(values);
  };

  return {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    dealPipelinesData: data?.data,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    dealPipelines,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    getCheckbox,
    setDisableButton,
    isDisableButton,
    addField,
    deleteField,
    setAnchorEl,
    isdefaultValue,
    isLoading,
    inputFields,
    handleChangeInput,
  };
};

export default useDealPipelines;
