import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  dealPipelinesDefaultValues,
  dealPipelinesvalidationSchema,
} from './DealPipelines.data';

import {
  useDeleteDealsPipelineMutation,
  useGetDealsPipelineQuery,
  usePostDealsPipelineMutation,
} from '@/services/airSales/deals/settings/deals-pipeline';
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
    { name: 'New', probability: null },
    { name: 'Lost', probability: null },
    { name: 'Won', probability: null },
  ]);
  const [checkedDeal, setCheckedDeal] = useState<string[]>([]);
  const [selectedPipelines, setSelectedPipelines] = useState<any>([]);

  const [postDealsPipeline] = usePostDealsPipelineMutation();
  const [deleteDealsPipeline] = useDeleteDealsPipelineMutation();

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

  const dealPipelines = useForm({
    resolver: yupResolver(dealPipelinesvalidationSchema),
    defaultValues: dealPipelinesDefaultValues,
  });
  const { handleSubmit, reset } = dealPipelines;

  const handleClose = () => {
    setAnchorEl(null);
    reset();
  };
  const handleCloseDrawer = () => {
    setIsDraweropen(false);
    reset();
  };

  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.pipelineName,
      isDefault: values?.defaultPipeline,
      dealStages: inputFields,
    };

    try {
      await postDealsPipeline({ body: payload })?.unwrap();
      reset();
      setIsDraweropen(false);
      enqueueSnackbar('Pipeline has been Created Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
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

  const handleDelete = async () => {
    try {
      await deleteDealsPipeline({ id: checkedDeal }).unwrap();
      setSelectedPipelines([]);
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

  const getCheckbox = (event: any, value: any) => {
    setDisableButton(event?.target?.checked);
    setdefaultValue(value === 'default');
  };

  const addField = () => {
    const newInputFields = [...inputFields];
    const indexToInsert = inputFields?.length - 2;
    newInputFields?.splice(indexToInsert, 0, { name: '', probability: null });
    setInputFields(newInputFields);
  };
  const deleteField = (index: any) => {
    const values = [...inputFields];
    values?.splice(index, 1);
    setInputFields(values);
  };
  const handleChangeInput = (index: any, event: any) => {
    const values: any = [...inputFields];
    values[index][event?.target?.name] = event?.target?.value;
    setInputFields(values);
  };

  const togglePipeline = (pipeline: any) => {
    const index = selectedPipelines?.findIndex(
      (p: any) => p?._id === pipeline?._id,
    );
    if (index === -1) {
      setSelectedPipelines([...selectedPipelines, pipeline]);
    } else {
      const updatedPipelines = [...selectedPipelines];
      updatedPipelines?.splice(index, 1);
      setSelectedPipelines(updatedPipelines);
    }
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
    checkedDeal,
    setCheckedDeal,
    selectedPipelines,
    setSelectedPipelines,
    togglePipeline,
  };
};

export default useDealPipelines;
