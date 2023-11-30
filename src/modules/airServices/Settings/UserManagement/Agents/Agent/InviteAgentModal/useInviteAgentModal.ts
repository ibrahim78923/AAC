import { useForm } from 'react-hook-form';
import {
  defaultValues,
  validationSchemaAgentFields,
} from './InviteAgentModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useInviteAgentModal = (props: any) => {
  const { setIsAgentModalOpen, handleAddAgentModal } = props;
  const inviteAgentMethods: any = useForm({
    resolver: yupResolver(validationSchemaAgentFields),
    defaultValues: defaultValues,
  });

  const onSubmit = () => {
    enqueueSnackbar('Invite Agent Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsAgentModalOpen(false);
    inviteAgentMethods?.reset();
  };

  return {
    inviteAgentMethods,
    onSubmit,
    handleAddAgentModal,
  };
};
