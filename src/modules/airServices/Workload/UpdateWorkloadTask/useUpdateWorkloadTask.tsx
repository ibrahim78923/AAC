import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getWorkloadDefaultValues,
  validationSchema,
  getWorkloadDataArray,
} from './UpdateWorkloadTask.data';
import { useEffect, useState } from 'react';
import {
  useLazyGetAssignToAgentsQuery,
  useLazyGetDepartmentDropdownQuery,
  usePatchTaskMutation,
} from '@/services/airServices/workload';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import {
  useLazyGetDynamicFieldsQuery,
  usePostAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';

export const useUpdateWorkloadTask = ({ onClose, dataGet }: any) => {
  const [form, setForm] = useState<any>([]);

  const [patchTaskTrigger, patchTaskStatus] = usePatchTaskMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_TASK,
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
    resolver: yupResolver(validationSchema?.(form)),
    defaultValues: getWorkloadDefaultValues?.(
      dataGet?.extendedProps?.data,
      form,
    ),
  });

  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    reset(() => getWorkloadDefaultValues(dataGet?.extendedProps?.data, form));
  }, [dataGet?.extendedProps?.data, reset, form]);

  const onSubmit = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
      return;
    }

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

      const queryParams = {
        ...Object?.fromEntries(
          Object?.entries(filteredEmptyData)?.filter(
            ([key]) => !customFieldKeys?.has(key),
          ),
        ),
        id: dataGet?.extendedProps?.data?._id,
        startDate: data?.startDate?.toISOString(),
        endDate: data?.endDate?.toISOString(),
        assignTo: data?.assignTo?._id,
        departmentId: data?.departmentId?._id,
        notifyBefore: filteredEmptyData?.notifyBefore?._id,
      };

      const reqBody = { customFields };

      const patchTaskParameter = {
        queryParams,
        reqBody,
      };

      await patchTaskTrigger(patchTaskParameter)?.unwrap();
      successSnackbar('Task Updated Successfully');
      onClose(false);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  useEffect(() => {
    reset(getWorkloadDefaultValues?.(dataGet?.extendedProps?.data));
  }, [dataGet, reset]);

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryAssignTo = useLazyGetAssignToAgentsQuery();

  const workloadDataArray = getWorkloadDataArray({
    apiQueryDepartment,
    apiQueryAssignTo,
  });

  return {
    handleSubmit,
    onSubmit,
    methods,
    workloadDataArray,
    patchTaskStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
  };
};
