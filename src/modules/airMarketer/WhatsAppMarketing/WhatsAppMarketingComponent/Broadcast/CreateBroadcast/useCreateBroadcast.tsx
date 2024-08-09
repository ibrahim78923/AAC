import { Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createBroadcastFields,
  defaultValues,
  validationSchema,
} from './CreateBroadcast.data';
import { enqueueSnackbar } from 'notistack';
import {
  ARRAY_INDEX,
  DRAWER_TYPES,
  NOTISTACK_VARIANTS,
  SMS_MARKETING_CONSTANTS,
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
  const router = useRouter();
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

  // Contacts Drawer
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const handleOpenContactsDrawer = () => {
    setIsAddContactDrawerOpen(true);
  };
  const handleCloseContactsDrawer = () => {
    setIsAddContactDrawerOpen(false);
  };

  const { handleSubmit, reset, watch, setValue } = methods;
  const detailsText = watch('detail');
  const previewName = watch(SMS_MARKETING_CONSTANTS?.NAME);
  const previewDetail = watch(SMS_MARKETING_CONSTANTS?.DETAIL);
  const previewAttachment = watch(SMS_MARKETING_CONSTANTS?.ATTACHMENT);
  const templateData = watch('templateId');

  useEffect(() => {
    setValue('detail', templateData?.detail);
  }, [templateData?.detail]);

  const formFields = createBroadcastFields(handleOpenContactsDrawer);

  const { data: getWhatsappBroadcatsById, isLoading: broadcastDetailsLoading } =
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
        campaignId: data?.campaign[0],
        templateId: data?.template[0],
        detail: data?.detail,
        attachment: data?.attachment?.url,
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
    const broadcastFormData = new FormData();
    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsText);
    broadcastFormData?.append('senderId', user?._id);
    broadcastFormData?.append('name', values?.name);
    broadcastFormData?.append('campaignId', values?.campaignId?._id);
    broadcastFormData?.append('templateId', values?.templateId?._id);
    broadcastFormData?.append('attachment', values?.attachment);
    broadcastFormData?.append(
      'recipients',
      selectedContactsData?.map((item: any) => item?._id),
    );
    broadcastFormData?.append('detail', cleanedDetailsText);
    try {
      if (type === DRAWER_TYPES?.EDIT) {
        await updateWhatsappBroadcast({
          id: selectedBroadCast,
          body: broadcastFormData,
        })?.unwrap();
        enqueueSnackbar(`Broadcast updated Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        return;
      }
      await postWhatsappBroadcast({ body: broadcastFormData })?.unwrap();
      enqueueSnackbar(`Broadcast created Successfully`, {
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

  return {
    handleCloseContactsDrawer,
    handleOpenContactsDrawer,
    broadcastDetailsLoading,
    setSelectedContactsData,
    isAddContactDrawerOpen,
    updateBroadcastLoading,
    selectedContactsData,
    postBroadcastLoading,
    flattenContactsData,
    setSelectedDateVal,
    previewAttachment,
    selectedDateVal,
    setSelectedRec,
    setIsSchedule,
    previewDetail,
    handleSubmit,
    previewName,
    selectedRec,
    formFields,
    isSchedule,
    onSubmit,
    methods,
    router,
    theme,
    type,
  };
};

export default useCreateBroadcast;
