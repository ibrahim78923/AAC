import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetDepartmentDropdownListQuery,
  useLazyGetPermissionsRoleForUpsertAgentQuery,
  usePatchAgentMutation,
  usePostAddAgentMutation,
} from '@/services/airServices/settings/user-management/agents';
import {
  agentFieldsData,
  defaultValues,
  validationSchemaAgentFields,
} from './UpsertAgent.data';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
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

export const useUpsertAgent = (props: any) => {
  const auth: any = useAuth();
  const [form, setForm] = useState<any>([]);
  const router = useRouter();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[0]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const roleApiQueryParams = {
    productId,
    organizationCompanyAccountId,
    organizationId,
    limit: 50,
  };

  const { selectedAgentList, setIsAgentModalOpen, setSelectedAgentList } =
    props;

  const [postAgentTrigger, postAgentStatus] = usePostAddAgentMutation();
  const [patchAgentTrigger, patchAgentStatus] = usePatchAgentMutation();

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

  const method = useForm({
    resolver: yupResolver(validationSchemaAgentFields?.(form)),
    defaultValues: defaultValues?.(selectedAgentList, form),
  });

  const { handleSubmit, reset } = method;

  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const roleApiQuery = useLazyGetPermissionsRoleForUpsertAgentQuery?.();

  useEffect(() => {
    reset(() => defaultValues(selectedAgentList, form));
  }, [selectedAgentList, reset, form]);

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
        updateAgent?.(body);
        return;
      }

      await postAgentTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Invite Agent Successfully!');
      handleClose?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const updateAgent = async (formData: any) => {
    delete formData?.email;
    const body = {
      id: selectedAgentList?.[0]?._id,
      ...formData,
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

  const upsertAgentFormFields = agentFieldsData(
    selectedAgentList,
    departmentDropdown,
    roleApiQuery,
    roleApiQueryParams,
  );

  return {
    method,
    departmentDropdown,
    handleSubmit,
    handleUpsertAgentSubmit,
    patchAgentStatus,
    postAgentStatus,
    handleClose,
    upsertAgentFormFields,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    form,
  };
};
