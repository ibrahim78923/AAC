import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetAirServicesCompanyByIdQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { getDefaultValues } from './ViewCompany.data';

export default function useViewCompany({ modalId, setModalId }: any) {
  const { data, isLoading, isFetching, isError } =
    useGetAirServicesCompanyByIdQuery(
      { params: { id: modalId?.id } },
      { refetchOnMountOrArgChange: true },
    );
  const defaultValues = getDefaultValues(data?.data);

  const methodsNewCompany = useForm({
    defaultValues,
  });

  const { reset } = methodsNewCompany;

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
    methodsNewCompany,
  };
}
