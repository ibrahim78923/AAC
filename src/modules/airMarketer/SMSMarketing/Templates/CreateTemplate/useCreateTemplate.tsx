import { useRouter } from 'next/router';
import {
  templateDefaultValues,
  templateValidationSchema,
} from './CreateTemplate.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import {
  usePostTemplateMutation,
  useUpdateTemplateMutation,
} from '@/services/airMarketer/SmsMarketing/Templates';
import { enqueueSnackbar } from 'notistack';
import { TASK_TYPE } from '@/constants';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { useEffect, useState } from 'react';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicFormInitialValue,
} from '@/utils/dynamic-forms';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { filteredEmptyValues } from '@/utils/api';

const useCreateTemplate = () => {
  const router = useRouter();
  const navigate = useRouter();
  const { type, data }: any = navigate.query;

  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_SMS_TEMPLATE,
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

  let editData: any = [];

  if (data) {
    editData = JSON?.parse(data);
  }

  const theme = useTheme();
  const [postTemplate, { isLoading: postTempLoading }] =
    usePostTemplateMutation();
  const [updateTemplate, { isLoading: updateTempLoading }] =
    useUpdateTemplateMutation();

  const initialValues: any = dynamicFormInitialValue(editData, form);

  const methods: any = useForm({
    resolver: yupResolver(templateValidationSchema?.(form)),
    defaultValues: templateDefaultValues({ editData }),
  });

  const { handleSubmit, watch, setValue } = methods;
  const TemplateName = watch('name');
  const Category = watch('category');
  const Details = watch('detail');

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    values.name = formData?.append('name', values?.name);
    values.category = formData?.append('category', values?.category);
    values.detail = formData?.append('detail', values?.detail);
    values.language = formData?.append('language', values?.language);

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
    }
    if (body?.customFields) {
      formData?.append('customFields', JSON?.stringify(body?.customFields));
    }

    try {
      if (type === TASK_TYPE?.EDIT_TASK) {
        await updateTemplate({ body: formData, id: editData?._id })?.unwrap();
      } else {
        await postTemplate({ body: formData })?.unwrap();
        router?.push(AIR_MARKETER?.SMS_MARKETING);
      }
      enqueueSnackbar(
        `Template ${
          type === TASK_TYPE?.EDIT_TASK ? 'Updated' : 'Created'
        } Successfully`,
        { variant: 'success' },
      );
      router?.push(AIR_MARKETER?.SMS_MARKETING);
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message, { variant: 'error' });
    }
  };

  const handleCancelBtn = () => {
    router?.push(AIR_MARKETER?.SMS_MARKETING);
  };

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key, initialValues[key]);
      });
    }
  }, [initialValues]);

  return {
    router,
    methods,
    handleSubmit,
    onSubmit,
    TemplateName,
    updateTempLoading,
    postTempLoading,
    Category,
    Details,
    type,
    theme,
    handleCancelBtn,
    form,
    getDynamicFieldsStatus,
  };
};

export default useCreateTemplate;
