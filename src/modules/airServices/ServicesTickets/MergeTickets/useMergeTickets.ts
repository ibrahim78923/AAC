import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  mergeTicketsFormDefaultValue,
  mergeTicketsFormFieldsDynamic,
} from './MergeTickets.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useMergedTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const { setIsMergedTicketsModalOpen } = props;

  const mergedTicketsFormMethod = useForm({
    defaultValues: mergeTicketsFormDefaultValue,
  });

  const { handleSubmit, reset } = mergedTicketsFormMethod;

  const submitMergedTicketsForm = () => {
    enqueueSnackbar('Tickets Merge Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeMergedTicketsModal?.();
  };

  const closeMergedTicketsModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setIsMergedTicketsModalOpen?.(false);
  };
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();

  const mergeTicketsFormFields = mergeTicketsFormFieldsDynamic(
    apiQueryOrganizations,
  );
  return {
    mergedTicketsFormMethod,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
  };
};
