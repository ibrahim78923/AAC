import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  createTemplateValidationSchema,
  newCreateTemplateDefaultValues,
} from './TemplateForm.data';
import { usePostWhatsappTemplateMutation } from '@/services/airMarketer/whatsappMarketing/templates';
import { useEffect, useState } from 'react';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { indexNumbers } from '@/constants';

const useTemplateForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const { editData }: any = router?.query;

  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_WHATSAPP_TEMPLATE,
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

  let editRecordData: any = [];
  if (editData) {
    editRecordData = JSON?.parse(editData);
  }

  const avatarFileUrl = {
    fileUrl: editRecordData?.imageUrl,
    orignalName: 'Attachment',
  };

  const templateMethods = useForm({
    resolver: yupResolver(createTemplateValidationSchema?.(form)),
    defaultValues: newCreateTemplateDefaultValues?.(),
  });

  const { handleSubmit, watch, reset } = templateMethods;

  useEffect(() => {
    reset(() => newCreateTemplateDefaultValues(editRecordData, form));
  }, [editRecordData?._id, reset, form]);

  const TemplateName = watch('name');
  const Category = watch('category');
  const Details = watch('detail');

  const [postWhatsappTemplate, { isLoading: postTemplateLoading }] =
    usePostWhatsappTemplateMutation();

  const [postAttachmentTrigger] = usePostDynamicFormAttachmentsMutation();

  const onSubmit = async (data: any) => {
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

      if (!!editRecordData?._id) {
        submitUpdateTemplate(body);
        return;
      }

      const formData = new FormData();
      if (body?.customFields) {
        formData?.append('customFields', JSON?.stringify(body?.customFields));
      }
      delete body?.customFields;
      Object?.keys(body)?.forEach((key) => {
        formData?.append(key, data[key]);
      });

      await postWhatsappTemplate({ body: formData })?.unwrap();
      successSnackbar('Template Added Successfully');
      router?.back();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateTemplate = async (data: any) => {
    const formData = new FormData();
    if (data?.customFields) {
      formData?.append('customFields', JSON?.stringify(data?.customFields));
    }
    delete data?.customFields;
    Object?.keys(data)?.forEach((key) => {
      formData?.append(key, data[key]);
    });
    formData?.append('templateSid', editRecordData?.sid);

    if (!!editRecordData?.imageUrl) {
      formData?.append('imageUrl', editRecordData?.imageUrl);
    }

    try {
      await postWhatsappTemplate({ body: formData })?.unwrap();
      successSnackbar('Template Updated Successfully!');
      router?.back();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    router,
    theme,
    templateMethods,
    handleSubmit,
    onSubmit,
    TemplateName,
    postTemplateLoading,
    Category,
    Details,
    form,
    getDynamicFieldsStatus,
    editRecordData,
    avatarFileUrl,
  };
};

export default useTemplateForm;
