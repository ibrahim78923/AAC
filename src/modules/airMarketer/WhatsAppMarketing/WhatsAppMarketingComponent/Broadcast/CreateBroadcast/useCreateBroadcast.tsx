import { Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  broadcastDefaultValues,
  broadCastValidationSchema,
  createBroadcastFields,
} from './CreateBroadcast.data';
import {
  DRAWER_TYPES,
  SMS_MARKETING_CONSTANTS,
  STATUS_CONTANTS,
} from '@/constants/strings';
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
  const [recipientType, setRecipientType] = useState<any>(null);
  const [selectedDateVal, setSelectedDateVal] = useState<any>(null);
  const [isSchedule, setIsSchedule] = useState(false);
  const [createStatus, setCreateStatus] = useState(STATUS_CONTANTS?.COMPLETED);
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
    resolver: yupResolver(broadCastValidationSchema(isSchedule, form)),
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
  const previewName = watch(SMS_MARKETING_CONSTANTS?.NAME);
  const previewAttachment = watch(SMS_MARKETING_CONSTANTS?.ATTACHMENT);
  const templateData = watch('templateId');
  const [detailsMsg, setDetailMsg] = useState(templateData?.detail);

  const processString = (input: any) => {
    const regex = /\[(.*?)\]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const templateDetailsVariables = processString(templateData?.detail);
  const variableValues = templateDetailsVariables?.map((variable) =>
    watch(`field_${variable}`),
  );

  useEffect(() => {
    let detailsTextMsg = templateData?.detail;
    templateDetailsVariables?.forEach((variable, index) => {
      const variableValue = variableValues[index];
      if (variableValue) {
        const regex = new RegExp(`\\[${variable}\\]`, 'g');
        detailsTextMsg = detailsTextMsg?.replace(regex, variableValue);
        setDetailMsg(detailsTextMsg);
      }
    });
    setValue('detail', templateData?.detail);
  }, [JSON?.stringify(variableValues), setValue, templateData?.detail]);
  const formFields = createBroadcastFields(handleOpenContactsDrawer);

  const [postWhatsappBroadcast, { isLoading: postBroadcastLoading }] =
    usePostWhatsappBroadcastMutation();

  const [updateWhatsappBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateWhatsappBroadcastMutation();

  useEffect(() => {
    if (type === DRAWER_TYPES?.EDIT) {
      const editBradcastData = {
        ...getWhatsappBroadcatsById?.data,
        campaignId: getWhatsappBroadcatsById?.data?.campaign[0],
        templateId: getWhatsappBroadcatsById?.data?.template[0],
        recipients: getWhatsappBroadcatsById?.data?.recipients?.map(
          (item: any) => `${item?.firstName} ${item?.lastName}`,
        ),
      };
      reset(() => broadcastDefaultValues(editBradcastData, form));
      setSelectedContactsData(getWhatsappBroadcatsById?.data?.recipients ?? []);
      setIsSchedule(
        getWhatsappBroadcatsById?.data?.schedualDate ? true : false,
      );
      setRecipientType(
        getWhatsappBroadcatsById?.data?.groupDetails?.length > 0
          ? SMS_MARKETING_CONSTANTS?.GROUP
          : SMS_MARKETING_CONSTANTS?.ALL,
      );
      const selectedContactsData =
        getWhatsappBroadcatsById?.data?.groupDetails?.length === 0
          ? getWhatsappBroadcatsById?.data?.recipients
          : getWhatsappBroadcatsById?.data?.groupDetails;
      setSelectedRec(
        Array.isArray(selectedContactsData) ? selectedContactsData : [],
      );
    }
  }, [getWhatsappBroadcatsById?.data, reset, form, type]);

  const [postAttachmentTrigger] = usePostDynamicFormAttachmentsMutation();

  const onSubmit = async (data: any) => {
    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsMsg);
    templateDetailsVariables?.forEach((item) => {
      delete data[`field_${item}`];
    });

    const payloadData: any = {
      ...data,
      senderId: user?._id,
      campaignId: data?.campaignId?._id,
      templateId: data?.templateId?._id,
      templateSid: templateData?.sid,
      status: createStatus,
      detail: cleanedDetailsText,
      variables: variableValues,
    };

    if (recipientType === SMS_MARKETING_CONSTANTS?.ALL) {
      payloadData.contactGroupId = [];
      payloadData.recipients = selectedContactsData?.map(
        (item: any) => item?._id,
      );
    } else {
      payloadData.recipients = selectedContactsData
        ?.map(
          (item: any) => item?.contacts?.map((contact: any) => contact?._id),
        )
        .flat();
      payloadData.contactGroupId = selectedContactsData?.map(
        (item: any) => item?._id,
      );
    }
    if (isSchedule) {
      payloadData.schedualDate = data?.schedualDate;
    }
    const filteredEmptyData = filteredEmptyValues(payloadData);

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
      }
      delete body?.customFields;
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      await postWhatsappBroadcast({ body: formData })?.unwrap();
      successSnackbar('Broadcast Created Successfully');
      // router?.back();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };
  const handleSaveAsDraft = () => {
    methods?.handleSubmit(onSubmit)();
  };

  const submitUpdateTemplate = async (data: any) => {
    const formData = new FormData();
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
    recipientType,
    setRecipientType,
    handleSubmit,
    previewName,
    selectedRec,
    formFields,
    isSchedule,
    onSubmit,
    methods,
    router,
    theme,
    handleSaveAsDraft,
    type,
    getDynamicFieldsStatus,
    form,
    detailsMsg,
    createStatus,
    setCreateStatus,
  };
};

export default useCreateBroadcast;
