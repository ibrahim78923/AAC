import { useEffect } from 'react';
import { useGetAirServicesCompanyByIdQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import {
  getDefaultValues,
  viewCompanyFormFieldsDynamic,
} from './ViewCompany.data';
import { useFormLib } from '@/hooks/useFormLib';

export const useViewCompany = (props: any) => {
  const { modalId, setModalId } = props;
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

  const viewCompanyFormFields = viewCompanyFormFieldsDynamic?.(
    data?.data?.profilePicture,
  );

  return {
    onClose,
    data,
    isLoading,
    isFetching,
    isError,
    methodsNewCompany,
    refetch,
    viewCompanyFormFields,
  };
};
