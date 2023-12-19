import { NOTISTACK_VARIANTS } from '@/constants/strings';
import usePath from '@/hooks/usePath';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const useAssignedTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const { setIsAssignedModalOpen } = props;

  const assignedTicketsMethod = useForm<any>({
    defaultValues: {
      user: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        user: Yup?.mixed()?.nullable()?.required(),
      }),
    ),
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
