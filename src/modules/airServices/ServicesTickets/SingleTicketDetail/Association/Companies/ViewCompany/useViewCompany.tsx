import { useEffect } from 'react';
import { useGetAirServicesCompanyByIdQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { getDefaultValues } from './ViewCompany.data';
import { useFormLib } from '@/hooks/useFormLib';

export default function useViewCompany({ modalId, setModalId }: any) {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetAirServicesCompanyByIdQuery(
      { params: { id: modalId?.id } },
      { refetchOnMountOrArgChange: true },
    );

  const formLibProps = {
    defaultValues: getDefaultValues(data?.data),
  };

  const { reset, methods: methodsNewCompany } = useFormLib(formLibProps);

  useEffect(() => {
    reset(getDefaultValues(data?.data));
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
    methodsNewCompany,
    refetch,
  };
}
