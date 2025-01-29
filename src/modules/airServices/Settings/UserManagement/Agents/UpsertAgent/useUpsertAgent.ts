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
import { useEffect } from 'react';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { IAgentsProps } from '../Agents.interface';
import { UpsertAgentResponseI } from './UpsertAgent.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

export const useUpsertAgent = (props: IAgentsProps) => {
  const router = useRouter();

  const { selectedAgentList, setIsAgentModalOpen, setSelectedAgentList } =
    props;

  const [postAgentTrigger, postAgentStatus] = usePostAddAgentMutation();
  const [patchAgentTrigger, patchAgentStatus] = usePatchAgentMutation();

  const [
    verifyServicesSettingsUserManagementAgentViaIgTrigger,
    verifyServicesSettingsUserManagementAgentViaIgStatus,
  ] = useVerifyServicesSettingsUserManagementAgentViaIgMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_ADD_AGENT,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

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

    try {
      const { customFields }: any = await handleUploadAttachments?.(
        data,
        filteredEmptyData,
      );

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
    attachmentsApiCallInProgress ||
    verifyServicesSettingsUserManagementAgentViaIgStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    handleUpsertAgentSubmit,
    handleClose,
    upsertAgentFormFields,
    form,
    apiCallInProgress,
    isDynamicFormLoading,
    hasDynamicFormError,
    getDynamicFormData,
  };
};
