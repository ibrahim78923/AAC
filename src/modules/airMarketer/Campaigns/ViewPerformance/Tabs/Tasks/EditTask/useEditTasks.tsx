import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { defaultValues, validationSchema } from './EditTask.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetCampaignsTaskByIdQuery,
  useUpdateCampaignTasksMutation,
} from '@/services/airMarketer/campaigns';
import { useEffect, useState } from 'react';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { errorSnackbar } from '@/utils/api';

const useEditTask = ({ setIsOpenEditTaskDrawer, selectedRec }: any) => {
  const theme = useTheme();
  const CAMPAIGN_ID = 'campaignId';
  const [form, setForm] = useState<any>([]);

  const [updateCampaignTasks, { isLoading: updateTaskLoading }] =
    useUpdateCampaignTasksMutation();

  const { data: getCampaignsTaskById, isLoading: loadingCampaignTasks } =
    useGetCampaignsTaskByIdQuery(selectedRec, {
      skip: !selectedRec,
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

  const methods: any = useForm({
    resolver: yupResolver(validationSchema(form)),
    defaultValues: defaultValues?.(),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(() => defaultValues(getCampaignsTaskById?.data[0], form));
  }, [getCampaignsTaskById?.data, reset, form]);

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
    submitUpdateCampaignsTask,
    getDynamicFieldsStatus,
    loadingCampaignTasks,
    updateTaskLoading,
    handleSubmit,
    CAMPAIGN_ID,
    methods,
    theme,
    form,
  };
};
export default useEditTask;
