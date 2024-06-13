import { useForm } from 'react-hook-form';
import { getDefaultValues, getFormFields } from './ViewContact.data';
import { useGetContactByIdQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import {
  useLazyGetContactOwnerQuery,
  useLazyGetLifeCycleStageQuery,
  useLazyGetStatusQuery,
} from '@/services/airServices/tickets/single-ticket-details/association';

export default function useViewContact({ modalId, setModalId }: any) {
  const { data, isLoading, isFetching, isError } = useGetContactByIdQuery(
    { params: { id: modalId?.id } },
    { refetchOnMountOrArgChange: true },
  );
  const defaultValues = getDefaultValues(data?.data);

  const methodsNewContact = useForm({
    defaultValues,
  });

  const { reset } = methodsNewContact;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, data]);

  const onClose = () => {
    setModalId({
      view: false,
      delete: false,
      id: '',
    });
  };

  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const contactOwner = useLazyGetContactOwnerQuery();
  const lifecycleStage = useLazyGetLifeCycleStageQuery();
  const status = useLazyGetStatusQuery();

  const formFields = getFormFields({
    orgId,
    contactOwner,
    lifecycleStage,
    status,
  });

  return {
    onClose,
    data,
    isLoading,
    isFetching,
    isError,
    methodsNewContact,
    formFields,
  };
}
