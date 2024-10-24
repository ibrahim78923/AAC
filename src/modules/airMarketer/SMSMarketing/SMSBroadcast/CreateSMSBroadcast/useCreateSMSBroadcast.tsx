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
  SMS_MARKETING_CONSTANTS,
  STATUS_CONTANTS,
} from '@/constants/strings';
import useSMSMarketing from '../../useSMSMarketing';
import { indexNumbers, productSuiteName } from '@/constants';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicFormInitialValue,
} from '@/utils/dynamic-forms';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { filteredEmptyValues } from '@/utils/api';

const useCreateSMSBroadcast = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const { type, id: selectedBroadCast } = navigate?.query;
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = useState(false);
  const [recipientType, setRecipientType] = useState<any>(null);
  const [selectedRec, setSelectedRec] = useState<string[]>([]);
  const [createStatus, setCreateStatus] = useState(STATUS_CONTANTS?.COMPLETED);
  const [detailsMsg, setDetailMsg] = useState();
  const [isSchedule, setIsSchedule] = useState(false);
  const { getIsPhoneConnected } = useSMSMarketing();

  // Dynamic form
  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_SMS_BROADCAST,
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

  const { data: getSmsBroadcatsById, isLoading: smsBroadcastLoading } =
    useGetSmsBroadcatsByIdQuery(selectedBroadCast, {
      skip: !selectedBroadCast,
    });

  const [postSmsBroadcast, { isLoading: postBroadcastLoading }] =
    usePostSmsBroadcastMutation();
  const [updateSmsBroadcast, { isLoading: updateBroadcastLoading }] =
    useUpdateSmsBroadcastMutation();

  const methods: any = useForm({
    resolver: yupResolver<any>(
      validationSchema(isSchedule, form, createStatus),
    ),
    defaultValues: defaultValues({}, form, getIsPhoneConnected),
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const broadcastName = watch('name');
  const detailsText = watch('detail');
  const templateData = watch('templateId');

  useEffect(() => {
    setValue('detail', templateData?.detail);
  }, [templateData?.detail, setValue, detailsMsg]);

  const initialValues: any = dynamicFormInitialValue(
    getSmsBroadcatsById?.data,
    form,
  );

  useEffect(() => {
    if (type === DRAWER_TYPES?.EDIT) {
      const data = getSmsBroadcatsById?.data;
      const fieldsToSet: any = {
        ...initialValues,
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
      reset(() => defaultValues(fieldsToSet, form, getIsPhoneConnected));
      setDetailMsg(data?.detail);
      setRecipientType(
        data?.groupDetails?.length > 0
          ? SMS_MARKETING_CONSTANTS?.GROUP
          : SMS_MARKETING_CONSTANTS?.ALL,
      );
      const selectedContactsData =
        data?.groupDetails?.length === indexNumbers?.ZERO
          ? data?.recipients
          : data?.groupDetails;
      setSelectedRec(
        Array?.isArray(selectedContactsData) ? selectedContactsData : [],
      );
      setIsSchedule(data?.schedualDate ? true : false);
    }
  }, [getSmsBroadcatsById, type, setValue, detailsMsg]);

  const onSubmit = async (values: any) => {
    const removeHtmlTags = (text: string) => text?.replace(/<[^>]*>?/gm, '');
    const cleanedDetailsText = removeHtmlTags(detailsText);
    const payloadData: any = {
      ...values,
      senderId: getIsPhoneConnected?.data?._id,
      campaignId: values?.campaignId?._id,
      templateId: values?.templateId?._id,
      status: createStatus,
      detail: cleanedDetailsText,
    };
    if (isSchedule) {
      payloadData.schedualDate = values?.schedualDate;
    }

    if (recipientType === SMS_MARKETING_CONSTANTS?.ALL) {
      payloadData.recipients = selectedRec?.map((item: any) => item?._id);
    } else {
      payloadData.recipients = [];
      payloadData.contactGroupIds = selectedRec?.map((item: any) => item?._id);
    }

    const filteredEmptyData = filteredEmptyValues(payloadData);
    const customFields: any = {};
    const body: any = {};
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
      ...body,
      detail: cleanedDetailsText,
    };
    try {
      if (type === DRAWER_TYPES?.EDIT) {
        await updateSmsBroadcast({
          id: selectedBroadCast,
          body: payload,
        })?.unwrap();
        enqueueSnackbar(`Sms Broadcast updated Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        navigate?.back();
      } else {
        await postSmsBroadcast({ body: payload })?.unwrap();
        enqueueSnackbar(`Sms Broadcast created Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        navigate?.back();
        reset();
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg)
        ? errMsg[indexNumbers?.ZERO]
        : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const flattenContactsData = (data: any[]) => {
    return data?.reduce((acc: any[], item: any) => {
      if (item?.recipients ?? item?.contacts) {
        if (item?.recipients) {
          return [...acc, ...item?.recipients];
        } else {
          return [...acc, ...item?.contacts];
        }
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
    getDynamicFieldsStatus,
    isAddContactDrawerOpen,
    updateBroadcastLoading,
    postBroadcastLoading,
    flattenContactsData,
    smsBroadcastLoading,
    handleSaveAsDraft,
    setCreateStatus,
    setSelectedRec,
    broadcastName,
    setIsSchedule,
    recipientType,
    setRecipientType,
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
    form,
    detailsMsg,
  };
};

export default useCreateSMSBroadcast;
