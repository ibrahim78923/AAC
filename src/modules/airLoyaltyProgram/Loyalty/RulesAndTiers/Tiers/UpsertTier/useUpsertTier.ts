import usePath from '@/hooks/usePath';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  upsertTierDefaultValues,
  upsertTierValidationSchema,
} from './UpsertTier.data';

export const useUpsertTier = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { makePath } = usePath();
  const upsertTierMethod = useForm({
    resolver: yupResolver(upsertTierValidationSchema),
    defaultValues: upsertTierDefaultValues,
  });

  const { handleSubmit, reset } = upsertTierMethod;

  const submitTierForm = () => {
    closeUpsertTier?.();
  };

  const closeUpsertTier = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['rulesAndTierAction'],
      }),
    );
    reset?.();
    setIsDrawerOpen?.(false);
  };

  return {
    closeUpsertTier,
    upsertTierMethod,
    handleSubmit,
    submitTierForm,
  };
};
