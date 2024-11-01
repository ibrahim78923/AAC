import { usePostDelegateUserInviteMutation } from '@/services/orgAdmin/Delegates';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  inviteMemberdefaultValues,
  inviteMemberValidation,
} from './InviteMemberModal.data';
import { enqueueSnackbar } from 'notistack';

const useInviteMemberModal = (setIsInviteModalOpen: any) => {
  const [postDelegateUserInvite, { isLoading: postInviteMemberLoading }] =
    usePostDelegateUserInviteMutation();

  const methods = useForm({
    resolver: yupResolver(inviteMemberValidation),
    defaultValues: inviteMemberdefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      await postDelegateUserInvite({ body: { email: data?.email } })?.unwrap();
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      setIsInviteModalOpen(false);
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    postInviteMemberLoading,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useInviteMemberModal;
