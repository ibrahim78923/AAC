import { useForm } from 'react-hook-form';

export const useUpsertTier = () => {
  const upsertTierMethod = useForm({
    defaultValues: {},
  });
  const { handleSubmit } = upsertTierMethod;

  const submitTierForm = () => {};
  const closeUpsertTier = () => {};

  return {
    closeUpsertTier,
    upsertTierMethod,
    handleSubmit,
    submitTierForm,
  };
};
