import { isoDateString } from '@/lib/date-time';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { useCallback, useState } from 'react';

export const useDynamicForm = (props: any) => {
  const { productType, moduleType } = props;
  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType,
      moduleType,
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

  const handleUploadAttachments = useCallback(
    async (formData: any, filterFormData: any) => {
      const customFields: any = {};
      const body: any = {};
      const attachmentPromises: Promise<any>[] = [];

      dynamicAttachmentsPost({
        form,
        data: formData,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filterFormData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = isoDateString(value);
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

      return { body, customFieldKeys, customFields };
    },
    [form, postAttachmentTrigger],
  );

  const isDynamicFormLoading =
    getDynamicFieldsStatus?.isLoading || getDynamicFieldsStatus?.isFetching;
  const hasDynamicFormError = getDynamicFieldsStatus?.isError;
  const attachmentsApiCallInProgress = postAttachmentStatus?.isLoading;

  return {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  };
};
