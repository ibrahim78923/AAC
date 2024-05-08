import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTierDefaultValues,
  upsertTierValidationSchema,
} from './UpsertTier.data';

export const useUpsertTier = (props: any) => {
  const { setIsDrawerOpen } = props;
  const upsertTierMethod = useForm({
    resolver: yupResolver(upsertTierValidationSchema),
    defaultValues: upsertTierDefaultValues,
  });

  const { handleSubmit, reset } = upsertTierMethod;

  const submitTierForm = () => {
    closeUpsertTier?.();
  };

  const closeUpsertTier = () => {
    reset?.();
    setIsDrawerOpen?.({});
  };

  return {
    closeUpsertTier,
    upsertTierMethod,
    handleSubmit,
    submitTierForm,
  };
};
