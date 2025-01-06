import {
  usePatchAgentMutation,
  usePostAddAgentMutation,
  useVerifyServicesSettingsUserManagementAgentViaIgMutation,
} from '@/services/airServices/settings/user-management/agents';
import {
  agentFieldsData,
  defaultValues,
  validationSchemaAgentFields,
} from './UpsertAgent.data';
import { filteredEmptyValues } from '@/utils/api';
import { ARRAY_INDEX, ROLES } from '@/constants/strings';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
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
import { IAgentsProps } from '../Agents.interface';
import { UpsertAgentResponseI } from './UpsertAgent.interface';
import { isoDateString } from '@/lib/date-time';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertAgent = (props: IAgentsProps) => {
  const [form, setForm] = useState<any>([]);
  const router = useRouter();

  const { selectedAgentList, setIsAgentModalOpen, setSelectedAgentList } =
    props;

  const [postAgentTrigger, postAgentStatus] = usePostAddAgentMutation();
  const [patchAgentTrigger, patchAgentStatus] = usePatchAgentMutation();

  const [
    verifyServicesSettingsUserManagementAgentViaIgTrigger,
    verifyServicesSettingsUserManagementAgentViaIgStatus,
  ] = useVerifyServicesSettingsUserManagementAgentViaIgMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_ADD_AGENT,
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

  const upsertAgentMethodProps = {
    validationSchema: validationSchemaAgentFields?.(form),
    defaultValues: defaultValues?.(selectedAgentList, form),
  };

  const { handleSubmit, reset, methods } = useFormLib(upsertAgentMethodProps);

  useEffect(() => {
    reset(() => defaultValues(selectedAgentList, form));
  }, [selectedAgentList, reset, form]);

  const verifyUserViaIg = async (email?: string) => {
    const apiDataParameter = { email: { email } };
    try {
      await verifyServicesSettingsUserManagementAgentViaIgTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error) {}
  };

  const handleUpsertAgentSubmit = async (data: any) => {
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

      const payload = {
        firstName: filteredEmptyData?.firstName,
        lastName: filteredEmptyData?.lastName,
        phoneNumber: filteredEmptyData?.phoneNumber,
        email: filteredEmptyData?.email,
        departmentId: filteredEmptyData?.departmentId?._id,
        permissionsRole: filteredEmptyData?.permissionsRole?._id,
        role: ROLES?.ORG_EMPLOYEE,
        timezone: filteredEmptyData?.timezone,
        customFields,
      };

      const apiDataParameter = {
        body: payload,
      };

      if (selectedAgentList?.length) {
        updateAgent?.(payload);
        return;
      }
      const response = (await postAgentTrigger(
        apiDataParameter,
      )?.unwrap()) as UpsertAgentResponseI;
      const email = {
        email: response?.email,
      };

      successSnackbar('Invite Agent Successfully!');
      handleClose?.();
      await verifyUserViaIg(email?.email);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const updateAgent = async (formData: any) => {
    delete formData?.email;
    const body = {
      ...formData,
      id: selectedAgentList?.[ARRAY_INDEX?.ZERO]?._id,
    };

    const apiDataParameter = {
      body,
    };

    try {
      const response: any = await patchAgentTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Update Agent Successfully!');
      handleClose?.();
      if (router?.pathname === AIR_SERVICES?.SINGLE_AGENT_DETAILS) {
        updateRoute?.(response?.data);
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsAgentModalOpen?.(false);
    reset?.();
    setSelectedAgentList?.([]);
  };

  const updateRoute = (response: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        agentId: response?._id,
        roleId: response?.permissionsRole,
        departmentId: response?.departmentId,
      },
    });
  };

  const upsertAgentFormFields = agentFieldsData(selectedAgentList);

  const apiCallInProgress =
    patchAgentStatus?.isLoading ||
    postAgentStatus?.isLoading ||
    postAttachmentStatus?.isLoading ||
    verifyServicesSettingsUserManagementAgentViaIgStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    handleUpsertAgentSubmit,
    handleClose,
    upsertAgentFormFields,
    getDynamicFieldsStatus,
    form,
    apiCallInProgress,
  };
};
