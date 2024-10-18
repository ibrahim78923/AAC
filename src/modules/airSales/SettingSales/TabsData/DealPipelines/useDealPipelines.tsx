import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteDealsPipelineMutation,
  useGetDealsPipelineQuery,
  usePostDealsPipelineMutation,
  useUpdateDealsPipelineMutation,
} from '@/services/airSales/deals/settings/deals-pipeline';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';

const useDealPipelines = () => {
  const theme = useTheme<Theme>();
  const [form, setForm] = useState<any>([]);
  const [isDraweropen, setIsDraweropen] = useState({
    isToggle: false,
    type: DRAWER_TYPES?.ADD,
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

  const [updateDealsPipeline, { isLoading: updateDealPipelineLoading }] =
    useUpdateDealsPipelineMutation();

  // Dynamic forms start here
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_DEAL_PIPELINE,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const onSubmit = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);
    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];

    try {
      dynamicAttachmentsPost({
        form,
        data: values,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = value?.toISOString();
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

      const payload = {
        name: body?.pipelineName,
        isDefault: body?.defaultPipeline ? true : false,
        dealStages: body?.dealStages,
        customFields: body?.customFields,
      };

      if (isDraweropen?.type === DRAWER_TYPES?.ADD) {
        const res = await postDealsPipeline({ body: payload })?.unwrap();
        if (res?.data?.isDefault) {
          enqueueSnackbar(
            `${res?.data?.name} has been Successfully created and set as Default.`,
            { variant: NOTISTACK_VARIANTS?.SUCCESS },
          );
        } else {
          enqueueSnackbar(`Pipeline has been Created Successfully `, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
        }
      } else {
        const resp: any = await updateDealsPipeline({
          id: checkedDeal,
          body: payload,
        });
        if (resp?.data?.data?.isDefault) {
          enqueueSnackbar(
            `${resp?.data?.data?.name} has been Successfully updated and set as Default.`,
            { variant: NOTISTACK_VARIANTS?.SUCCESS },
          );
        } else {
          enqueueSnackbar(`Pipeline has been Updated Successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
        }
      }
      setIsDraweropen({ isToggle: false, type: '' });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  // Dynamic forms end here
  const paramsObj: any = {};
  if (productSearch) paramsObj['search'] = productSearch;
  const query = '&' + new URLSearchParams(paramsObj)?.toString();

  const { data, isLoading } = useGetDealsPipelineQuery({
    query,
    meta: false,
  });

  const defaultPipeline = data?.data?.find(
    (pipeline: any) => pipeline?.isDefault,
  );

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

  const handleIsDefaultPipeline = async (id: any, val: any) => {
    const payload = {
      isDefault: val,
    };
    await updateDealsPipeline({ id: id, body: payload });
    enqueueSnackbar(`Pipeline has been Updated Successfully`, {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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

  const disabled: { [key: number]: boolean } = {
    0: true,
    1: true,
    2: true,
  };

  const hasDefaultPipeline = (
    pipelines: any[],
    checkedDeal: string | any[],
  ) => {
    return pipelines?.some(
      (pipeline) =>
        pipeline?.isDefault === true && checkedDeal.includes(pipeline?._id),
    );
  };

  const isDefaultPipeline = hasDefaultPipeline(data?.data, checkedDeal);
  return {
    dealPipelinesData: data?.data,
    updateDealPipelineLoading,
    getDynamicFieldsStatus,
    handleIsDefaultPipeline,
    defaultPipeline,
    postAttachmentStatus,
    handleCloseDeleteModal,
    handleSelectDealsById,
    setDeleteModalOpen,
    isDeleteModalOpen,
    handleCloseDrawer,
    deleteDealLoading,
    isDefaultPipeline,
    setproductSearch,
    setIsDraweropen,
    setDisableButton,
    postDealLoading,
    setdefaultValue,
    setCheckedDeal,
    isDisableButton,
    isDraweropen,
    setIsEditMode,
    isdefaultValue,
    handleDelete,
    checkedDeal,
    handleClose,
    isEditMode,
    handleClick,
    setAnchorEl,
    onSubmit,
    isLoading,
    disabled,
    anchorEl,
    theme,
    open,
    form,
  };
};

export default useDealPipelines;
