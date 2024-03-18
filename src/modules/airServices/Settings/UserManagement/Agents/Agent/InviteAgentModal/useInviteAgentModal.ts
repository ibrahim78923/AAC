import { useForm } from 'react-hook-form';
import {
  validationSchemaAgentFields,
  defaultValues,
} from './InviteAgentModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { AGENTS, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetDepartmentDropdownListQuery,
  usePatchAgentMutation,
  usePostAddAgentMutation,
} from '@/services/airServices/settings/user-management/agents';
import { useEffect } from 'react';

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
        const res: any = await postAgentTrigger({
          firstName: formData?.firstName ?? '',
          lastName: formData?.lastName ?? '',
          phoneNumber: formData?.phoneNumber ?? '',
          email: formData?.email ?? '',
          departmentId: formData?.departmentId?._id ?? '',
          role: formData?.role ?? '',
          timezone: formData?.timezone ?? '',
        });
        enqueueSnackbar(res?.data?.message && 'Invite Agent Successfully!', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        handleAddAgentModal?.(false);
        reset();
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message ?? 'Failed to invite agent. Please try again.',
          {
            variant: NOTISTACK_VARIANTS?.ERROR,
          },
        );
      }
    } else {
      try {
        const agentId = selectedAgentList.map((agent: any) => agent?._id);
        const res: any = await agentUpdate({
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
        enqueueSnackbar(res?.data?.message && 'Update Agent Successfully!', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        handleAddAgentModal?.(false);
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message ?? 'Failed to update agent. Please try again.',
          {
            variant: NOTISTACK_VARIANTS?.ERROR,
          },
        );
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
