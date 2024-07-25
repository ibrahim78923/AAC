import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import { defaultValues, validationSchema } from './CreateSMSBroadcast.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetSmsBroadcatsByIdQuery,
  usePostSmsBroadcastMutation,
  useUpdateSmsBroadcastMutation,
} from '@/services/airMarketer/SmsMarketing';
import { enqueueSnackbar } from 'notistack';
import {
  DRAWER_TYPES,
  NOTISTACK_VARIANTS,
  STATUS_CONTANTS,
} from '@/constants/strings';
import useSMSMarketing from '../../useSMSMarketing';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { indexNumbers, productSuiteName } from '@/constants';

const useCreateSMSBroadcast = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const { type, id: selectedBroadCast } = navigate?.query;
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [selectedContactsData, setSelectedContactsData] = useState<any>([]);
  const [createStatus, setCreateStatus] = useState(STATUS_CONTANTS?.COMPLETED);
  const [isSchedule, setIsSchedule] = useState(
    type === DRAWER_TYPES?.EDIT ? true : false,
  );
  const { getIsPhoneConnected } = useSMSMarketing();

  const { data: getSmsBroadcatsById, isLoading: smsBroadcastLoading } =
    useGetSmsBroadcatsByIdQuery(selectedBroadCast, {
      skip: !selectedBroadCast,
    });

  const [postSmsBroadcast, { isLoading: postBroadcastLoading }] =
    usePostSmsBroadcastMutation();
  const [updateSmsBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateSmsBroadcastMutation();

  const methods: any = useForm({
    resolver: yupResolver<any>(validationSchema(isSchedule)),
    defaultValues: defaultValues(getIsPhoneConnected),
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const broadcastName = watch('name');
  const detailsText = watch('detail');
  const templateData = watch('templateId');

  useEffect(() => {
    setValue('detail', templateData?.detail);
  }, [templateData?.detail]);

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
        schedualDate:
          typeof data?.schedualDate === productSuiteName?.string
            ? new Date(data?.schedualDate)
            : null,
      };
      for (const key in fieldsToSet) {
        setValue(key, fieldsToSet[key]);
      }
      setSelectedContactsData(data?.recipients ?? []);
      setSelectedRec(data?.recipients);
    }
  }, [getSmsBroadcatsById]);

  const onSubmit = async (values: any) => {
    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsText);
    values.senderId = getIsPhoneConnected?.data?._id;
    values.campaignId = values?.campaignId?._id;
    values.templateId = values?.templateId?._id;
    values.recipients = selectedContactsData[indexNumbers?.ZERO]?.contacts?.map(
      (item: any) => item?._id,
    );
    values.detail = cleanedDetailsText;
    values.status = createStatus;
    values.schedualDate = values.schedualDate ?? undefined;

    try {
      if (type === DRAWER_TYPES?.EDIT) {
        await updateSmsBroadcast({
          id: selectedBroadCast,
          body: values,
        })?.unwrap();
        enqueueSnackbar(`Sms Broadcast updated Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        navigate?.push(AIR_MARKETER?.SMS_MARKETING);
      }
      await postSmsBroadcast({ body: values })?.unwrap();
      enqueueSnackbar(`Sms Broadcast created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg)
        ? errMsg[indexNumbers?.ZERO]
        : errMsg;
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
    updateBroadcastLoading,
    postBroadcastLoading,
    selectedContactsData,
    flattenContactsData,
    smsBroadcastLoading,
    handleSaveAsDraft,
    setCreateStatus,
    setSelectedRec,
    broadcastName,
    setIsSchedule,
    handleSubmit,
    createStatus,
    selectedRec,
    detailsText,
    isSchedule,
    navigate,
    onSubmit,
    methods,
    theme,
    type,
  };
};

export default useCreateSMSBroadcast;
