import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTierDefaultValues,
  upsertTierValidationSchema,
} from './UpsertTier.data';
import { useEffect, useState } from 'react';
import {
  useAddTiersMutation,
  useEditSingleTiersMutation,
  useGetSingleTiersDetailsQuery,
  useLazyGetContactListForTierQuery,
} from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpsertTier = (props: any) => {
  const { setIsDrawerOpen, tierId, closeDetailTier } = props;
  const [termData, setTermData] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const storedId = tierId?._id;
  const { data, isLoading, isFetching, isError }: any =
    useGetSingleTiersDetailsQuery(storedId, {
      refetchOnMountOrArgChange: true,
      skip: !!!storedId,
    });

  const formData = data?.data;
  const upsertTierMethod = useForm({
    resolver: yupResolver(upsertTierValidationSchema),
    defaultValues: upsertTierDefaultValues(formData),
  });

  const { handleSubmit, reset, watch, setValue } = upsertTierMethod;
  const watchedValues = watch(['name', 'description', 'amount', 'points']);

  useEffect(() => {
    const allFieldsFilled = watchedValues?.every(
      (value) => value !== undefined && value !== '',
    );
    setIsFormFilled(allFieldsFilled);
  }, [watchedValues]);

  const apiContactQuery = useLazyGetContactListForTierQuery();
  const [postTierTrigger, postTierProgress] = useAddTiersMutation();
  const [updateTierTrigger, updateTierProgress] = useEditSingleTiersMutation();

  const submitTierForm = async (tierData: any) => {
    const tierFormData = new FormData();
    tierFormData?.append('name', tierData?.name);
    tierFormData?.append('description', tierData?.description);
    tierFormData?.append('logo', tierData?.logo);
    tierFormData?.append('points', tierData?.points);
    tierFormData?.append('amount', tierData?.amount);
    termData && tierFormData?.append('type', tierData?.type);
    termData && tierFormData?.append('attribute', tierData?.attribute?.value);
    termData && tierFormData?.append('operator', tierData?.operator?.value);
    termData && tierFormData?.append('fieldValue', tierData?.fieldValue);
    tierFormData?.append(
      'contacts',
      tierData?.contacts?.map((item: any) => item?._id),
    );

    const postApiDataParameter = {
      body: tierFormData,
    };

    if (!!storedId) {
      return submitUpdateTierForm(tierFormData);
    }

    try {
      await postTierTrigger(postApiDataParameter)?.unwrap();
      successSnackbar('Tier added successfully');
      closeUpsertTier?.();
      reset?.();
    } catch (error) {
      errorSnackbar();
    }
  };

  const submitUpdateTierForm = async (tierData: any) => {
    const putApiDataParameter = {
      id: storedId,
      body: tierData,
    };
    try {
      await updateTierTrigger(putApiDataParameter)?.unwrap();
      successSnackbar('Tier update successfully');
      closeUpsertTier?.();
      closeDetailTier?.();
      reset?.();
    } catch (error) {
      errorSnackbar();
    }
  };
  useEffect(() => {
    reset(upsertTierDefaultValues(formData));
  }, [reset, formData]);

  const closeUpsertTier = () => {
    reset?.();
    setIsDrawerOpen?.({});
  };
  const attributesValues = watch('attribute');
  useEffect(() => {
    if (!termData) {
      setValue('type', termData || attributesValues?.label ? 'CONTACTS' : '');
    }
  }, [termData, attributesValues]);

  useEffect(() => {
    if (storedId === undefined) {
      setValue('operator', null);
      setValue('contacts', []);
      setValue('fieldValue', '');
    }
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
    tierId,
    isLoading,
    isError,
    isFetching,
    updateTierProgress,
    isFormFilled,
  };
};
