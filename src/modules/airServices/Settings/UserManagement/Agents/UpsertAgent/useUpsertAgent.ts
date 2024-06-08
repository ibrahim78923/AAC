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

export const useUpsertAgent = (props: any) => {
  const auth: any = useAuth();
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

  const [patchAgentTrigger, patchAgentStatus] = usePatchAgentMutation();

  const method = useForm({
    resolver: yupResolver(validationSchemaAgentFields),
    defaultValues: defaultValues(selectedAgentList),
  });

  const { handleSubmit, reset } = method;

  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();
  const roleApiQuery = useLazyGetPermissionsRoleForUpsertAgentQuery?.();

  const [postAgentTrigger, postAgentStatus] = usePostAddAgentMutation();

  const handleUpsertAgentSubmit = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);
    const body = {
      firstName: newFormData?.firstName,
      lastName: newFormData?.lastName,
      phoneNumber: newFormData?.phoneNumber,
      email: newFormData?.email,
      departmentId: newFormData?.departmentId?._id,
      permissionsRole: newFormData?.permissionsRole?._id,
      role: ROLES?.ORG_EMPLOYEE,
      timezone: newFormData?.timezone,
    };

    const apiDataParameter = {
      body,
    };

    if (selectedAgentList?.length) {
      updateAgent?.(body);
      return;
    }

    try {
      await postAgentTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Invite Agent Successfully!');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
  };
};
