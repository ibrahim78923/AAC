import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTierDefaultValues,
  upsertTierValidationSchema,
} from './UpsertTier.data';
import { useState } from 'react';

export const useUpsertTier = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [termData, setTermData] = useState(false);
  const upsertTierMethod = useForm({
    resolver: yupResolver(upsertTierValidationSchema),
    defaultValues: upsertTierDefaultValues,
  });

  const { handleSubmit, reset, watch } = upsertTierMethod;

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
    termData,
    setTermData,
    watch,
  };
};
