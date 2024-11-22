import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { consumerFormFieldDefaultValues } from './UpsertConsumer.data';
import { useGetConsumerDetailsByIdQuery } from '@/services/airLoyaltyProgram/consumers';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useUpsertConsumer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading, isFetching, isError, refetch } =
    useGetConsumerDetailsByIdQuery(id, { refetchOnMountOrArgChange: true });

  const methods: any = useForm({
    defaultValues: consumerFormFieldDefaultValues(data?.data),
  });

  const { reset } = methods;

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
