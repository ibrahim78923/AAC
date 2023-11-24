import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  moveTicketsDefaultValue,
  moveTicketsFormFieldsDynamic,
} from './MoveTickets.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useMoveTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const { setIsMoveTicketsModalOpen } = props;

  const moveTicketsFormMethod = useForm({
    defaultValues: moveTicketsDefaultValue,
  });

  const { handleSubmit, reset } = moveTicketsFormMethod;

  const submitMoveTicketsForm = () => {
    enqueueSnackbar('Tickets Move Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeMoveTicketsModal?.();
  };

  const closeMoveTicketsModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setIsMoveTicketsModalOpen?.(false);
  };
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const moveTicketsFormFields = moveTicketsFormFieldsDynamic(
    apiQueryOrganizations,
    apiQueryOrganizations,
  );
  return {
    moveTicketsFormMethod,
    closeMoveTicketsModal,
    handleSubmit,
    submitMoveTicketsForm,
    moveTicketsFormFields,
  };
};
