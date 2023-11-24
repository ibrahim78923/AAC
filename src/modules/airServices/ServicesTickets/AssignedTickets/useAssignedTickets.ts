import { NOTISTACK_VARIANTS } from '@/constants/strings';
import usePath from '@/hooks/usePath';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const useAssignedTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const { setIsAssignedModalOpen } = props;

  const assignedTicketsMethod = useForm({
    defaultValues: {
      user: null,
    },
  });

  const { handleSubmit, reset } = assignedTicketsMethod;

  const submitAssignedTicketsForm = () => {
    enqueueSnackbar('Ticket Assigned Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeTicketsAssignedModal?.();
  };

  const closeTicketsAssignedModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setIsAssignedModalOpen?.(false);
  };
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();

  return {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeTicketsAssignedModal,
    apiQueryOrganizations,
  };
};
