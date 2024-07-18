import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { validationSchema } from './EditTask.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetCampaignsTaskByIdQuery,
  useUpdateCampaignTasksMutation,
} from '@/services/airMarketer/campaigns';
import { useEffect } from 'react';

const useEditTask = ({
  initialValueProps,
  setIsOpenEditTaskDrawer,
  selectedRec,
}: any) => {
  const theme = useTheme();
  const CAMPAIGN_ID = 'campaignId';

  const [updateCampaignTasks, { isLoading: updateTaskLoading }] =
    useUpdateCampaignTasksMutation();

  const { data: getCampaignsTaskById } =
    useGetCampaignsTaskByIdQuery(selectedRec);

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    const data = getCampaignsTaskById?.data[0];
    const fieldsToSet: any = {
      taskName: data?.taskName,
      taskType: data?.taskType,
      campaignId: data?.campaignDetails[0],
      assignedTo: data?.assignedTo[0],
      dueDate: data?.dueDate ? new Date(data?.dueDate) : null,
      time: data?.time ? new Date(data?.time) : null,
      note: data?.note,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [getCampaignsTaskById]);

  const onSubmit = async (values: any) => {
    values.assignedTo = values.assignedTo?._id;
    values.campaignId = values.campaignId?._id;
    try {
      delete values?.campaignId;
      await updateCampaignTasks({
        id: selectedRec,
        body: values,
      })?.unwrap();
      enqueueSnackbar('Task Updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    reset();
    setIsOpenEditTaskDrawer(false);
  };

  return {
    updateTaskLoading,
    handleSubmit,
    CAMPAIGN_ID,
    onSubmit,
    methods,
    theme,
  };
};
export default useEditTask;
