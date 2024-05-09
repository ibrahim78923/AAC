import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTierDefaultValues,
  upsertTierValidationSchema,
} from './UpsertTier.data';
import { useEffect, useState } from 'react';
import {
  useAddTiersMutation,
  useLazyGetContactListForTierQuery,
} from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpsertTier = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [termData, setTermData] = useState(false);
  const upsertTierMethod = useForm({
    resolver: yupResolver(upsertTierValidationSchema),
    defaultValues: upsertTierDefaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = upsertTierMethod;
  const apiContactQuery = useLazyGetContactListForTierQuery();

  const [postTierTrigger, postTierProgress] = useAddTiersMutation();

  const submitTierForm = async (data: any) => {
    const tierFormData = new FormData();
    tierFormData?.append('name', data?.name);
    tierFormData?.append('description', data?.description);
    tierFormData?.append('logo', data?.logo);
    tierFormData?.append('points', data?.points);
    tierFormData?.append('amount', data?.amount);
    tierFormData?.append('type', data?.type);
    tierFormData?.append('attribute', data?.attribute?.value);
    tierFormData?.append('operator', data?.operator?.value);
    tierFormData?.append('fieldValue', data?.fieldValue);
    tierFormData?.append(
      'contacts',
      data?.contacts?.map((item: any) => item?._id),
    );

    const apiDataParameter = {
      body: tierFormData,
    };

    try {
      await postTierTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Tier added successfully');
      closeUpsertTier?.();
      reset?.();
    } catch (error) {
      errorSnackbar();
    }
  };

  const closeUpsertTier = () => {
    reset?.();
    setIsDrawerOpen?.({});
  };

  const attributesValues = watch('attribute');

  useEffect(() => {
    setValue('operator', null);
    setValue('contacts', []);
    setValue('fieldValue', '');
  }, [attributesValues]);

  return {
    closeUpsertTier,
    upsertTierMethod,
    handleSubmit,
    submitTierForm,
    termData,
    setTermData,
    watch,
    apiContactQuery,
    postTierProgress,
  };
};
