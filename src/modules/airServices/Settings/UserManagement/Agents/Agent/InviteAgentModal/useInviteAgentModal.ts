import { useForm } from 'react-hook-form';
import {
  validationSchemaAgentFields,
  defaultValues,
} from './InviteAgentModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { AGENTS } from '@/constants/strings';
import {
  useLazyGetDepartmentDropdownListQuery,
  usePatchAgentMutation,
  usePostAddAgentMutation,
} from '@/services/airServices/settings/user-management/agents';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useInviteAgentModal = (props: any) => {
  const { handleAddAgentModal, selectedAgentList, editAgentModalTitle } = props;
  const [agentUpdate] = usePatchAgentMutation();
  const inviteAgentMethods = useForm({
    resolver: yupResolver(validationSchemaAgentFields),
    defaultValues: defaultValues(selectedAgentList),
  });
  const { handleSubmit, reset } = inviteAgentMethods;
  useEffect(() => {
    reset(defaultValues(selectedAgentList));
  }, [selectedAgentList, reset]);

  const departmentDropdown = useLazyGetDepartmentDropdownListQuery();

  const [postAgentTrigger, postAgentProgress] = usePostAddAgentMutation();
  const isLoading = postAgentProgress?.isLoading;
  const handleFormSubmit = async (formData: any) => {
    if (editAgentModalTitle === AGENTS?.INVITE_AGENT) {
      try {
        await postAgentTrigger({
          firstName: formData?.firstName ?? '',
          lastName: formData?.lastName ?? '',
          phoneNumber: formData?.phoneNumber ?? '',
          email: formData?.email ?? '',
          departmentId: formData?.departmentId?._id ?? '',
          role: formData?.role ?? '',
          timezone: formData?.timezone ?? '',
        });
        successSnackbar('Invite Agent Successfully!');
        handleAddAgentModal?.(false);
        reset();
      } catch (error: any) {
        errorSnackbar();
      }
    } else {
      try {
        const agentId = selectedAgentList.map((agent: any) => agent?._id);
        await agentUpdate({
          body: {
            id: agentId,
            firstName: formData?.firstName ?? '',
            lastName: formData?.lastName ?? '',
            phoneNumber: formData?.phoneNumber ?? '',
            departmentId: formData?.departmentId?._id ?? '',
            role: formData?.role ?? '',
            timezone: formData?.timezone ?? '',
          },
        });
        successSnackbar('Update Agent Successfully!');
        handleAddAgentModal?.(false);
      } catch (error: any) {
        errorSnackbar();
      }
    }
  };
  const handleSubmitAgent = handleSubmit(handleFormSubmit);
  return {
    inviteAgentMethods,
    handleAddAgentModal,
    handleSubmitAgent,
    isLoading,
    departmentDropdown,
  };
};
