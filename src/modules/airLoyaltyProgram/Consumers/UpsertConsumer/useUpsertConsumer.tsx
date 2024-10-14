import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { consumerFormFieldDefaultValues } from './UpsertConsumer.data';

export const useUpsertConsumer = () => {
  const router = useRouter();
  const methods: any = useForm({
    defaultValues: consumerFormFieldDefaultValues(),
  });
  return {
    methods,
    router,
  };
};
