import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTicketTaskFormDefaultValues,
  upsertTicketTaskFormFormFieldsDynamic,
  upsertTicketTaskFormValidationSchema,
} from './UpsertTasks.data';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { useRouter } from 'next/router';
import {
  useLazyGetDepartmentDropdownListForTicketTasksQuery,
  useLazyGetUsersDropdownListForTicketTasksQuery,
  usePatchTaskByIdMutation,
  usePostTaskByIdMutation,
} from '@/services/airServices/tickets/single-ticket-details/tasks';
import { ARRAY_INDEX } from '@/constants/strings';
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
import { TicketsTasksPortalComponentPropsI } from '../Tasks.interface';

export const useUpsertTasks = (props: TicketsTasksPortalComponentPropsI) => {
  const {
    setIsPortalOpen,
    selectedTasksList,
    setSelectedTasksLists,
    isPortalOpen,
  } = props;
  const router = useRouter();

  const { ticketId } = router?.query;

  const [form, setForm] = useState<any>([]);

  const [postTicketTasksTrigger, postTicketTasksStatus] =
    usePostTaskByIdMutation();

  const [patchTicketTasksTrigger, patchTicketTasksStatus] =
    usePatchTaskByIdMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

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

  const methods = useForm({
    resolver: yupResolver(upsertTicketTaskFormValidationSchema?.(form)),
    defaultValues: upsertTicketTaskFormDefaultValues?.(selectedTasksList, form),
  });

  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    reset(() => upsertTicketTaskFormDefaultValues(selectedTasksList, form));
  }, [selectedTasksList, reset, form]);

  const submitUpsertTicketTasks = async (data: any) => {
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
        ticketId: ticketId,
        startDate: filteredEmptyData?.startDate?.toISOString(),
        endDate: filteredEmptyData?.endDate?.toISOString(),
        assignTo: filteredEmptyData?.assignTo?._id,
        departmentId: filteredEmptyData?.departmentId?._id,
        notifyBefore: filteredEmptyData?.notifyBefore?._id,
      };

      const reqBody = { customFields };

      const apiDataParameter = {
        queryParams,
        reqBody,
      };

      if (isPortalOpen?.isEdit) {
        patchUpsertTicketTasks?.(apiDataParameter);
        return;
      }

      await postTicketTasksTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Task Created Successfully!');
      handleCloseDrawer?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const patchUpsertTicketTasks = async (formData: any) => {
    delete formData?.queryParams?.ticketId;

    const queryParams = {
      ...formData?.queryParams,
      id: selectedTasksList?.[ARRAY_INDEX?.ZERO]?._id,
    };
    const apiDataParameter = {
      queryParams,
      reqBody: formData?.reqBody,
    };

    try {
      await patchTicketTasksTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Task Updated Successfully!');
      handleCloseDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.error?.message);
    }
  };

  const handleCloseDrawer = () => {
    setIsPortalOpen({});
    setSelectedTasksLists?.([]);
    reset();
  };

  const apiQueryDepartment =
    useLazyGetDepartmentDropdownListForTicketTasksQuery();
  const apiQueryUser = useLazyGetUsersDropdownListForTicketTasksQuery();
  const upsertTicketTaskFormFormFields =
    upsertTicketTaskFormFormFieldsDynamic?.(apiQueryDepartment, apiQueryUser);

  return {
    submitUpsertTicketTasks,
    methods,
    handleCloseDrawer,
    handleSubmit,
    upsertTicketTaskFormFormFields,
    postTicketTasksStatus,
    patchTicketTasksStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
  };
};
