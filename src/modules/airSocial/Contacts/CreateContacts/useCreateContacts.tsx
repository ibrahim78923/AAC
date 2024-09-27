import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetContactsLifeCycleStagesQuery,
  useLazyGetContactsOwnerListQuery,
  useLazyGetContactsStatusListQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';
import { useEffect, useState } from 'react';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { filteredEmptyValues } from '@/utils/api';

const useCreateContacts = (handleRefresh: any) => {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetContactsOwnerListQuery();
  const contactStatusData = useLazyGetContactsStatusListQuery();
  const lifeCycleStagesData = useLazyGetContactsLifeCycleStagesQuery();

  // custom fields ++
  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_COMMON_MODULE,
      moduleType: DYNAMIC_FIELDS?.MT_CONTACT,
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
  // custom fields --

  const [postContacts, { isLoading: loadingCreateContact }] =
    usePostContactsMutation();
  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema(form)),
    defaultValues: async () => {
      return contactsDefaultValues;
    },
  });

  const { handleSubmit, reset } = methodscontacts;

  const onSubmit = async (values: any, closeDrawer: any) => {
    const formData = new FormData();
    const filteredEmptyData = filteredEmptyValues(values);
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
      formData?.append('customFields', JSON?.stringify(body?.customFields));
    }

    Object.entries(values)?.forEach(([key, value]: any) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !customFieldKeys.has(key)
      ) {
        switch (key) {
          case 'dateOfBirth':
          case 'dateOfJoining':
            formData.append(key, dayjs(value).format(DATE_FORMAT?.API));
            break;
          case 'contactOwnerId':
          case 'lifeCycleStageId':
          case 'statusId':
            formData.append(key, value?._id);
            break;
          default:
            formData.append(key, value);
            break;
        }
      }
    });

    try {
      const contactResponse = await postContacts({ body: formData })?.unwrap();

      if (contactResponse?.data) {
        handleRefresh();
        closeDrawer();
        reset();
        enqueueSnackbar('Contact has been Added Successfully', {
          variant: 'success',
        });
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitCreateContact = (closeDrawer: any) =>
    handleSubmit((values) => onSubmit(values, closeDrawer));

  return {
    orgId,
    loadingCreateContact,
    submitCreateContact,
    methodscontacts,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
    form,
    getDynamicFieldsStatus,
  };
};

export default useCreateContacts;
