import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import { defaultValues, validationSchema } from './CreateSMSBroadcast.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetSmsBroadcatsByIdQuery,
  usePostSmsBroadcastMutation,
  useUpdateSmsBroadcatsMutation,
} from '@/services/airMarketer/SmsMarketing';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import useSMSMarketing from '../../useSMSMarketing';
import { AIR_MARKETER } from '@/routesConstants/paths';

const useCreateSMSBroadcast = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const { type, id: selectedBroadCast } = navigate?.query;
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [selectedContactsData, setSelectedContactsData] = useState<any>([]);
  const [createStatus, setCreateStatus] = useState('Completed');
  const { getIsPhoneConnected } = useSMSMarketing();

  const { data: getSmsBroadcatsById } =
    useGetSmsBroadcatsByIdQuery(selectedBroadCast);

  const [postSmsBroadcast, { isLoading: postBroadcastLoading }] =
    usePostSmsBroadcastMutation();
  const [updateSmsBroadcats, { isLoading: updateBroadcastLoading }] =
    useUpdateSmsBroadcatsMutation();

  const methods: any = useForm({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: defaultValues(getIsPhoneConnected),
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const selectedCampaingn = watch('campaignId');
  const detailsText = watch('detail');

  useEffect(() => {
    if (type === DRAWER_TYPES?.EDIT) {
      const data = getSmsBroadcatsById?.data;
      const fieldsToSet: any = {
        name: data?.name,
        campaignId: data?.campaign,
        templateId: data?.template,
        detail: data?.detail,
        recipients:
          data?.recipients?.map(
            (item: any) => `${item?.firstName} ${item?.lastName}`,
          ) ?? [],
      };
      for (const key in fieldsToSet) {
        setValue(key, fieldsToSet[key]);
      }
      setSelectedContactsData(data?.recipients ?? []);
      setSelectedRec(data?.recipients);
    }
  }, [getSmsBroadcatsById?.data]);

  const onSubmit = async (values: any) => {
    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsText);
    values.senderId = getIsPhoneConnected?.data?._id;
    values.campaignId = values?.campaignId?._id;
    values.templateId = values?.templateId?._id;
    values.recipients = selectedContactsData?.map((item: any) => item?._id);
    values.detail = cleanedDetailsText;
    values.status = createStatus;
    try {
      if (type === DRAWER_TYPES?.EDIT) {
        await updateSmsBroadcats({
          id: selectedBroadCast,
          body: values,
        })?.unwrap();
        enqueueSnackbar(`Sms Broadcast updated Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        return;
      }
      await postSmsBroadcast({ body: values })?.unwrap();
      enqueueSnackbar(`Sms Broadcast created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    navigate?.push(AIR_MARKETER?.SMS_MARKETING);
    reset();
  };

  const flattenContactsData = (data: any[]) => {
    return data?.reduce((acc: any[], item: any) => {
      if (item?.contacts) {
        return [...acc, ...item?.contacts];
      } else {
        return [...acc, item];
      }
    }, []);
  };

  const handleSaveAsDraft = () => {
    methods?.handleSubmit(onSubmit)();
  };

  return {
    setIsAddContactDrawerOpen,
    setSelectedContactsData,
    isAddContactDrawerOpen,
    createStatus,
    updateBroadcastLoading,
    postBroadcastLoading,
    selectedContactsData,
    flattenContactsData,
    selectedCampaingn,
    handleSaveAsDraft,
    setSelectedRec,
    setCreateStatus,
    handleSubmit,
    selectedRec,
    detailsText,
    navigate,
    onSubmit,
    methods,
    theme,
    type,
  };
};

export default useCreateSMSBroadcast;
