import { Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  broadcastDefaultValues,
  broadCastValidationSchema,
  createBroadcastFields,
} from './CreateBroadcast.data';
import { SMS_MARKETING_CONSTANTS } from '@/constants/strings';
import {
  useGetWhatsappBroadcatsByIdQuery,
  usePostWhatsappBroadcastMutation,
  useUpdateWhatsappBroadcastMutation,
} from '@/services/airMarketer/whatsapp-marketing';
import { useRouter } from 'next/router';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { indexNumbers } from '@/constants';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import { getSession } from '@/utils';

const useCreateBroadcast = () => {
  const { user }: any = getSession();
  const router = useRouter();
  const theme = useTheme<Theme>();
  const navigate = useRouter();
  const { type, id: selectedBroadCast } = navigate?.query;
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [selectedContactsData, setSelectedContactsData] = useState<any>([]);
  const [selectedDateVal, setSelectedDateVal] = useState<any>(null);
  const [isSchedule, setIsSchedule] = useState(false);
  const [form, setForm] = useState<any>([]);

  const { data: getWhatsappBroadcatsById, isLoading: broadcastDetailsLoading } =
    useGetWhatsappBroadcatsByIdQuery(selectedBroadCast);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_WHATSAPP_BROADCAST,
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
    resolver: yupResolver(broadCastValidationSchema(form)),
    defaultValues: broadcastDefaultValues?.(),
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

  const processString = (input: any) => {
    const regex = /\[(.*?)\]/g;
    const matches = [];
    let match;
    // Collect all matches and store them in an array
    while ((match = regex.exec(input)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const templateDetailsVariables = processString(templateData?.detail);
  const variableValues = templateDetailsVariables?.map((variable) =>
    watch(variable),
  );

  useEffect(() => {
    let detailsText = templateData?.detail;
    templateDetailsVariables?.forEach((variable, index) => {
      const variableValue = variableValues[index];

      if (variableValue) {
        const regex = new RegExp(`\\[${variable}\\]`, 'g');
        detailsText = detailsText?.replace(regex, `[${variableValue}]`);
      }
    });
    setValue('detail', detailsText);
  }, [JSON?.stringify(variableValues), setValue, templateData?.detail]);

  const formFields = createBroadcastFields(handleOpenContactsDrawer);

  const [postWhatsappBroadcast, { isLoading: postBroadcastLoading }] =
    usePostWhatsappBroadcastMutation();

  const [updateWhatsappBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateWhatsappBroadcastMutation();

  // useEffect(() => {
  //   if (type === DRAWER_TYPES?.EDIT) {
  //     const data = getWhatsappBroadcatsById?.data;

  //     const fieldsToSet: any = {
  //       name: data?.name,
  //       campaignId: data?.campaign[0],
  //       templateId: data?.template[0],
  //       detail: data?.detail,
  //       attachment: data?.attachment?.url,
  //       recipients:
  //         data?.recipients?.map(
  //           (item: any) => `${item?.firstName} ${item?.lastName}`,
  //         ) ?? [],
  //     };
  //     for (const key in fieldsToSet) {
  //       setValue(key, fieldsToSet[key]);
  //     }
  //     setSelectedContactsData(data?.recipients ?? []);
  //     setSelectedRec(data?.recipients);
  //   }
  // }, [getWhatsappBroadcatsById?.data]);

  // const onSubmit = async (values: any) => {
  //   const broadcastFormData = new FormData();
  //   const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
  //   const cleanedDetailsText = removeHtmlTags(detailsText);
  //   broadcastFormData?.append('senderId', user?._id);
  //   broadcastFormData?.append('name', values?.name);
  //   broadcastFormData?.append('campaignId', values?.campaignId?._id);
  //   broadcastFormData?.append('templateId', values?.templateId?._id);
  //   broadcastFormData?.append('attachment', values?.attachment);
  //   broadcastFormData?.append(
  //     'recipients',
  //     selectedContactsData?.map((item: any) => item?._id),
  //   );
  //   broadcastFormData?.append('detail', cleanedDetailsText);
  //   try {
  //     if (type === DRAWER_TYPES?.EDIT) {
  //       await updateWhatsappBroadcast({
  //         id: selectedBroadCast,
  //         body: broadcastFormData,
  //       })?.unwrap();
  //       enqueueSnackbar(`Broadcast updated Successfully`, {
  //         variant: NOTISTACK_VARIANTS?.SUCCESS,
  //       });
  //       return;
  //     }
  //     await postWhatsappBroadcast({ body: broadcastFormData })?.unwrap();
  //     enqueueSnackbar(`Broadcast created Successfully`, {
  //       variant: NOTISTACK_VARIANTS?.SUCCESS,
  //     });
  //   } catch (error: any) {
  //     const errMsg = error?.data?.message;
  //     const errMessage = Array?.isArray(errMsg)
  //       ? errMsg[ARRAY_INDEX?.ZERO]
  //       : errMsg;
  //     enqueueSnackbar(errMessage ?? 'Error occurred', {
  //       variant: NOTISTACK_VARIANTS?.ERROR,
  //     });
  //   }
  //   navigate?.push(AIR_MARKETER?.WHATSAPP_MERKETING);
  //   reset();
  // };

  useEffect(() => {
    const editBradcastData = {
      ...getWhatsappBroadcatsById?.data,
      campaignId: getWhatsappBroadcatsById?.data?.campaign[0],
      templateId: getWhatsappBroadcatsById?.data?.template[0],
      recipients: getWhatsappBroadcatsById?.data?.recipients?.map(
        (item: any) => `${item?.firstName} ${item?.lastName}`,
      ),
    };
    reset(() => broadcastDefaultValues(editBradcastData, form));
  }, [getWhatsappBroadcatsById?.data, reset, form]);

  const [postAttachmentTrigger] = usePostDynamicFormAttachmentsMutation();

  const onSubmit = async (data: any) => {
    data.senderId = user?._id;
    data.recipients = selectedContactsData?.map((item: any) => item?._id);
    data.campaignId = data?.campaignId?._id;
    data.templateId = data?.templateId?._id;
    data.templateSid = templateData?.sid;

    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsText);
    data.detail = cleanedDetailsText;
    data.variables = templateDetailsVariables;
    templateDetailsVariables?.forEach((variable) => {
      delete data[variable];
    });
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

      if (Object?.keys(customFields)?.length > indexNumbers?.ZERO) {
        body.customFields = customFields;
      }

      if (!!selectedBroadCast) {
        submitUpdateTemplate(body);
        return;
      }

      const formData = new FormData();
      if (body?.customFields) {
        formData?.append('customFields', JSON?.stringify(body?.customFields));
        formData?.append('detail', cleanedDetailsText);
      }
      delete body?.customFields;
      delete body?.detail;
      Object.keys(body).forEach((key) => {
        formData.append(key, data[key]);
      });

      await postWhatsappBroadcast({ body: formData })?.unwrap();
      successSnackbar('Broadcast Created Successfully');
      router?.back();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateTemplate = async (data: any) => {
    const formData = new FormData();
    formData.append('language', 'English');
    Object.keys(data).forEach((key) => {
      formData.append(key, JSON?.stringify(data[key]));
    });

    const updateWhatsappBroadcastParameter = {
      id: selectedBroadCast,
      body: formData,
    };

    try {
      await updateWhatsappBroadcast(updateWhatsappBroadcastParameter)?.unwrap();
      successSnackbar('Broadcast Updated Successfully!');
      router?.back();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
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
    templateDetailsVariables,
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
    getDynamicFieldsStatus,
    form,
  };
};

export default useCreateBroadcast;
