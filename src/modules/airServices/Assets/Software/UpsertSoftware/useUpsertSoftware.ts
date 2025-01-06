import { useRouter } from 'next/router';
import {
  usePostSoftwareMutation,
  useEditSoftwareMutation,
} from '@/services/airServices/assets/software';

import { filteredEmptyValues } from '@/utils/api';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from './UpsertSoftware.data';
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
  UpsertSoftwareFormI,
  UpsertSoftwareI,
} from './UpsertSoftware.interface';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertSoftware = (props: UpsertSoftwareI) => {
  const { setIsAddDrawerOpen, data, isLoading, isFetching } = props;
  const router = useRouter();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  const { softwareId } = router?.query;

  const [form, setForm] = useState<any>([]);

  const [postSoftwareTrigger, postSoftwareStatus] = usePostSoftwareMutation();

  const [editSoftwareTrigger, editSoftwareStatus] = useEditSoftwareMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_SOFTWARE,
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

  const useFormValues = {
    validationSchema: upsertSoftwareFormValidationSchema?.(form),
    defaultValues: upsertSoftwareFormDefaultValues?.(),
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const submitUpsertSoftware = async (data: any) => {
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

      const details = {
        description: body?.description,
        category: body?.category,
        publisher: body?.publisher,
        managedBy: body?.managedBy?._id,
      };

      delete body?.description;
      delete body?.category;
      delete body?.publisher;
      delete body?.managedBy;

      const modifiedData = {
        ...body,
        details,
      };

      if (!!softwareId) {
        updateSoftware?.(modifiedData);
        return;
      }

      await postSoftwareTrigger(modifiedData);
      successSnackbar('Software Created Successfully');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateSoftware = async (formData: UpsertSoftwareFormI) => {
    const editSoftwareParams = {
      id: softwareId,
      body: formData,
    };
    try {
      await editSoftwareTrigger(editSoftwareParams);
      successSnackbar('Software Updated Successfully');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => upsertSoftwareFormDefaultValues(data, form));
  }, [reset, data, form]);

  const onClose = () => {
    setIsAddDrawerOpen?.(false);
    reset();
  };

  return {
    onClose,
    methods,
    handleSubmit,
    postSoftwareStatus,
    softwareId,
    isLoading,
    isFetching,
    editSoftwareStatus,
    submitUpsertSoftware,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
    productId,
  };
};
