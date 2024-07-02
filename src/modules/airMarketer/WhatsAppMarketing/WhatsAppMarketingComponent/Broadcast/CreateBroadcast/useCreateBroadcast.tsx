import { Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './CreateBroadcast.data';
import { enqueueSnackbar } from 'notistack';
import {
  ARRAY_INDEX,
  DRAWER_TYPES,
  NOTISTACK_VARIANTS,
} from '@/constants/strings';
import {
  useGetWhatsappBroadcatsByIdQuery,
  usePostWhatsappBroadcastMutation,
  useUpdateWhatsappBroadcastMutation,
} from '@/services/airMarketer/whatsapp-marketing';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { getSession } from '@/utils';

const useCreateBroadcast = () => {
  const theme = useTheme<Theme>();
  const { user }: any = getSession();
  const navigate = useRouter();
  const { type, id: selectedBroadCast } = navigate?.query;
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [selectedContactsData, setSelectedContactsData] = useState<any>([]);
  const [selectedDateVal, setSelectedDateVal] = useState<any>(null);
  const [isSchedule, setIsSchedule] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;
  const detailsText = watch('details');

  const { data: getWhatsappBroadcatsById } =
    useGetWhatsappBroadcatsByIdQuery(selectedBroadCast);

  const [postWhatsappBroadcast, { isLoading: postBroadcastLoading }] =
    usePostWhatsappBroadcastMutation();

  const [updateWhatsappBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateWhatsappBroadcastMutation();

  useEffect(() => {
    if (type === DRAWER_TYPES?.EDIT) {
      const data = getWhatsappBroadcatsById?.data;
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
  }, [getWhatsappBroadcatsById?.data]);

  const onSubmit = async (values: any) => {
    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsText);
    values.senderId = user?._id;
    values.campaignId = values?.campaignId?._id;
    values.templateId = values?.templateId?._id;
    values.recipients = selectedContactsData?.map((item: any) => item?._id);
    values.detail = cleanedDetailsText;
    values.schedualDate = selectedDateVal ?? undefined;

    try {
      if (type === DRAWER_TYPES?.EDIT) {
        await updateWhatsappBroadcast({
          id: selectedBroadCast,
          body: values,
        })?.unwrap();
        enqueueSnackbar(`Sms Broadcast updated Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        return;
      }
      await postWhatsappBroadcast({ body: values })?.unwrap();
      enqueueSnackbar(`Sms Broadcast created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg)
        ? errMsg[ARRAY_INDEX?.ZERO]
        : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    navigate?.push(AIR_MARKETER?.WHATSAPP_MERKETING);
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

  // Contacts Drawer
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const handleOpenContactsDrawer = () => {
    setIsAddContactDrawerOpen(true);
  };
  const handleCloseContactsDrawer = () => {
    setIsAddContactDrawerOpen(false);
  };

  return {
    handleCloseContactsDrawer,
    handleOpenContactsDrawer,
    setSelectedContactsData,
    isAddContactDrawerOpen,
    updateBroadcastLoading,
    selectedContactsData,
    postBroadcastLoading,
    flattenContactsData,
    setSelectedDateVal,
    selectedDateVal,
    setSelectedRec,
    setIsSchedule,
    handleSubmit,
    selectedRec,
    isSchedule,
    onSubmit,
    methods,
    theme,
    type,
  };
};

export default useCreateBroadcast;
