import { getDefaultValues } from './ViewContact.data';
import { useEffect } from 'react';
import { useGetAirServicesTicketContactByIdQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useFormLib } from '@/hooks/useFormLib';

export default function useViewContact({ modalId, setModalId }: any) {
  const { data, isLoading, isFetching, isError } =
    useGetAirServicesTicketContactByIdQuery(
      { params: { id: modalId?.id } },
      { refetchOnMountOrArgChange: true },
    );
  const defaultValues = getDefaultValues(data?.data);

  const formLibProps = {
    defaultValues,
  };

  const { reset, methods: methodsNewContact } = useFormLib(formLibProps);

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

  return {
    onClose,
    data,
    isLoading,
    isFetching,
    isError,
    methodsNewContact,
  };
}
