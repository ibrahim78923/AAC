import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetDepartmentDropdownListQuery,
  usePatchAgentMutation,
  usePostAddAgentMutation,
} from '@/services/airServices/settings/user-management/agents';
import { useEffect } from 'react';
import {
  agentFieldsData,
  defaultValues,
  validationSchemaAgentFields,
} from './UpsertAgent.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpsertAgent = (props: any) => {
  const { selectedAgentList, setIsAgentModalOpen, setSelectedAgentList } =
    props;

  const [patchAgentTrigger, patchAgentStatus] = usePatchAgentMutation();

  const method = useForm({
    resolver: yupResolver(validationSchemaAgentFields),
    defaultValues: defaultValues(selectedAgentList),
  });

  const { handleSubmit, reset } = method;

  useEffect(() => {
    reset(defaultValues(selectedAgentList));
  }, [selectedAgentList, reset]);

  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();

  const [postAgentTrigger, postAgentStatus] = usePostAddAgentMutation();

  const handleUpsertAgentSubmit = async (formData: any) => {
    const body = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      phoneNumber: formData?.phoneNumber,
      email: formData?.email,
      departmentId: formData?.departmentId?._id,
      role: formData?.role,
      timezone: formData?.timezone,
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
      await patchAgentTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Update Agent Successfully!');
      handleClose?.();
      setSelectedAgentList?.([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsAgentModalOpen?.(false);
    reset?.();
    setSelectedAgentList?.([]);
  };
  const upsertAgentFormFields = agentFieldsData(
    selectedAgentList,
    departmentDropdown,
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
