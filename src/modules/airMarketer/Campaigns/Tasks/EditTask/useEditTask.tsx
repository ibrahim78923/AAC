import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { defaultValues, validationSchema } from './EditTask.data';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetCampaignsTaskByIdQuery,
  usePostCampaignTaskMutation,
  useUpdateCampaignTasksMutation,
} from '@/services/airMarketer/campaigns';
import { useEffect, useState } from 'react';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { errorSnackbar, filteredEmptyValues } from '@/utils/api';
import dayjs from 'dayjs';

const useEditTask = ({ setIsOpenEditTaskDrawer, selectedRec, isType }: any) => {
  const theme = useTheme();
  const CAMPAIGN_ID = 'campaignId';
  const [form, setForm] = useState<any>([]);

  const [postCampaignTask, { isLoading: postTaskLoading }] =
    usePostCampaignTaskMutation();

  const [updateCampaignTasks, { isLoading: updateTaskLoading }] =
    useUpdateCampaignTasksMutation();

  const { data: getCampaignsTaskById, isLoading: loadingCampaignTasks } =
    useGetCampaignsTaskByIdQuery(selectedRec, {
      skip:
        !Array?.isArray(selectedRec) ||
        selectedRec?.length === indexNumbers?.ZERO,
    });

  // Dynamic fields starts here
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_TASK,
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

  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema(form)),
    defaultValues: defaultValues?.(),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(() => defaultValues(getCampaignsTaskById?.data[0], form));
  }, [getCampaignsTaskById?.data, reset, form]);

  const onSubmit = async (data: any) => {
    data.assignedTo = data?.assignedTo?._id;
    data.campaignId = data?.campaignId?._id;
    data.dueDate = dayjs(data?.dueDate)?.format(DATE_FORMAT?.API);

    const filteredEmptyData = filteredEmptyValues(data);
    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];
    try {
      dynamicAttachmentsPost({
        form,
        data,
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

      if (isType === DRAWER_TYPES?.EDIT) {
        submitUpdateCampaignsTask(body);
        return;
      }

      await postCampaignTask({ body: body })?.unwrap();
      enqueueSnackbar('Task Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setIsOpenEditTaskDrawer(false);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateCampaignsTask = async (data: any) => {
    delete data?.campaignId;
    try {
      await updateCampaignTasks({
        id: selectedRec,
        body: data,
      })?.unwrap();
      enqueueSnackbar('Task Updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setIsOpenEditTaskDrawer(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  // Dynamic fields ends here

  return {
    getDynamicFieldsStatus,
    loadingCampaignTasks,
    postAttachmentStatus,
    updateTaskLoading,
    postTaskLoading,
    handleSubmit,
    CAMPAIGN_ID,
    onSubmit,
    methods,
    theme,
    form,
  };
};
export default useEditTask;
