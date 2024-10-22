import { useForm } from 'react-hook-form';
import {
  departmentFormValidation,
  departmentFormValues,
} from './UpsertDepartment.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostDepartmentMutation,
  useUpdateDepartmentMutation,
} from '@/services/airServices/settings/user-management/departments';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { useEffect, useState } from 'react';
import { isoDateString } from '@/utils/dateTime';

export const useUpsertDepartment = (props: any) => {
  const { setOpenUpsertModal, selectedDepartment, setSelectedDepartment } =
    props;
  const [form, setForm] = useState<any>([]);

  const [postDepartmentTrigger, postDepartmentStatus] =
    usePostDepartmentMutation();
  const [updateDepartmentTrigger, updateDepartmentStatus] =
    useUpdateDepartmentMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_DEPARTMENT,
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

  const method = useForm({
    resolver: yupResolver(departmentFormValidation?.(form)),
    defaultValues: departmentFormValues(selectedDepartment, form),
  });

  const { handleSubmit, reset } = method;

  useEffect(() => {
    reset(() => departmentFormValues(selectedDepartment, form));
  }, [selectedDepartment, reset, form]);

  const submitUpsertDepartment = async (data: any) => {
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

      const departmentFormData = new FormData();
      departmentFormData?.append('name', data?.name);
      departmentFormData?.append('description', data?.description);
      departmentFormData?.append(
        'departmentHeadId',
        data?.departmentHeadDetails?._id ?? '',
      );
      if (data?.fileUrl !== null) {
        departmentFormData?.append('fileUrl', data?.fileUrl);
      }
      departmentFormData?.append(
        'members',
        data?.membersListDetails?.map((value: any) => value?._id),
      );

      if (body?.customFields) {
        departmentFormData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      if (selectedDepartment?._id) {
        await submitEditForm(departmentFormData);
        return;
      }

      const postDepartmentApiParameters = {
        body: departmentFormData,
      };

      await postDepartmentTrigger(postDepartmentApiParameters)?.unwrap();
      successSnackbar('Department Added Successfully');
      handleClose?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitEditForm = async (departmentFormData: any) => {
    departmentFormData?.append('id', selectedDepartment?._id);
    const updateDepartmentParameter = {
      body: departmentFormData,
    };

    try {
      await updateDepartmentTrigger(updateDepartmentParameter)?.unwrap();
      successSnackbar('Department Updated Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setOpenUpsertModal?.(false);
    setSelectedDepartment?.('');
    reset();
  };

  return {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    method,
    updateDepartmentStatus,
    selectedDepartment,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
  };
};
