import { useRouter } from 'next/router';
import { consumerFormFieldDefaultValues } from './UpsertConsumer.data';
import { useGetConsumerDetailsByIdQuery } from '@/services/airLoyaltyProgram/consumers';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertConsumer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading, isFetching, isError, refetch } =
    useGetConsumerDetailsByIdQuery(id, { refetchOnMountOrArgChange: true });

  const formLibProps = {
    defaultValues: consumerFormFieldDefaultValues(data?.data),
  };

  const { reset, methods } = useFormLib(formLibProps);

  useEffect(() => {
    reset(consumerFormFieldDefaultValues(data?.data));
  }, [reset, data]);

  return {
    methods,
    router,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
