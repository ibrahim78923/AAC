import { setIsPortalClose } from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  FORM_STEP_CONSTANT,
  upsertTiersBasicFormFieldsDynamic,
  upsertTiersFormDefaultValue,
  upsertTiersFormValidationSchema,
} from './UpsertTiers.data';
import { useEffect, useState } from 'react';
import {
  useAddLoyaltyProgramLoyaltySingleTierMutation,
  useGetLoyaltyProgramLoyaltySingleTierDetailsQuery,
  useUpdateLoyaltyProgramLoyaltySingleTierMutation,
} from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES } from '@/constants/api';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';
import { useGetTiersLists } from '../TiersHooks/useGetTiersLists';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { loyaltyProgramTiersIsPortalOpenSelector } from '@/redux/slices/airLoyaltyProgram/tiers/selectors';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertTiers = () => {
  const [formStep, setFormStep] = useState(FORM_STEP_CONSTANT?.FIRST_STEP);
  const { getLoyaltyProgramTiersList } = useGetTiersLists?.();

  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(loyaltyProgramTiersIsPortalOpenSelector);

  const [
    addLoyaltyProgramLoyaltySingleTierTrigger,
    addLoyaltyProgramLoyaltySingleTierStatus,
  ] = useAddLoyaltyProgramLoyaltySingleTierMutation();

  const [
    updateLoyaltyProgramLoyaltySingleTierTrigger,
    updateLoyaltyProgramLoyaltySingleTierStatus,
  ] = useUpdateLoyaltyProgramLoyaltySingleTierMutation();

  const apiDataParameter = {
    pathParams: {
      id: isPortalOpen?.data?._id,
    },
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } = useGetLoyaltyProgramLoyaltySingleTierDetailsQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !isPortalOpen?.data?._id,
    },
  );

  const formLibProps = {
    validationSchema: upsertTiersFormValidationSchema?.(formStep),
    defaultValues: upsertTiersFormDefaultValue?.(),
  };

  const {
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    reset,
    methods,
  } = useFormLib(formLibProps);

  const isFormValid =
    !!watch('name') &&
    !!watch('description') &&
    !!watch('amount') &&
    !!watch('points');

  const closePortal = () => {
    dispatch(setIsPortalClose());
  };

  const submitUpsertTiers = async () => {
    if (formStep === FORM_STEP_CONSTANT?.FIRST_STEP) {
      const isValid = await trigger([
        'name',
        'description',
        'amount',
        'points',
      ]);
      if (!isValid) return;
      setFormStep(FORM_STEP_CONSTANT?.SECOND_STEP);
      return;
    }
    handleSubmit(submitTier)();
  };

  const submitTier = async (formData: any) => {
    const tierFormData = new FormData();
    tierFormData?.append('name', formData?.name);
    tierFormData?.append('description', formData?.description);
    tierFormData?.append('amount', formData?.amount);
    tierFormData?.append('points', formData?.points);
    tierFormData?.append('type', formData?.type);
    tierFormData?.append('attribute', formData?.attribute?._id);
    formData?.logo !== null && tierFormData?.append('logo', formData?.logo);
    formData?.attribute?._id !==
      LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT &&
      tierFormData.append('operator', formData?.operator?._id);
    formData?.attribute?._id ===
      LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT &&
      tierFormData.append(
        'contacts',
        formData?.contacts?.map((contact: any) => contact?._id),
      );
    formData?.attribute?._id !==
      LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT &&
      tierFormData.append('fieldValue', formData?.fieldValue);

    if (
      isPortalOpen?.action ===
      RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.EDIT_TIERS
    ) {
      submitUpdateTier(tierFormData);
      return;
    }
    const apiDataParameter = {
      body: tierFormData,
    };

    try {
      await addLoyaltyProgramLoyaltySingleTierTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Tier added successfully');
      closePortal?.();
      await getLoyaltyProgramTiersList?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateTier = async (formData: any) => {
    const tierFormData = formData;
    const apiDataParameter = {
      body: tierFormData,
      pathParams: {
        id: isPortalOpen?.data?._id,
      },
    };

    try {
      await updateLoyaltyProgramLoyaltySingleTierTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Tier updated successfully');
      closePortal?.();
      await getLoyaltyProgramTiersList?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const cancelBtnHandler = () => {
    if (formStep === FORM_STEP_CONSTANT?.SECOND_STEP) {
      setFormStep(FORM_STEP_CONSTANT?.FIRST_STEP);
      return;
    }
    closePortal?.();
  };

  const upsertTiersBasicFormFields = upsertTiersBasicFormFieldsDynamic?.(
    formStep,
    watch,
    clearErrors,
    setValue,
    trigger,
    isPortalOpen?.data?._id,
  );

  const apiCallInProgress =
    updateLoyaltyProgramLoyaltySingleTierStatus?.isLoading ||
    addLoyaltyProgramLoyaltySingleTierStatus?.isLoading;

  useEffect(() => {
    reset(() => upsertTiersFormDefaultValue?.(data?.data));
  }, [reset, data?.data]);

  const showLoader = isLoading || isFetching;

  return {
    isPortalOpen,
    closePortal,
    upsertTiersBasicFormFields,
    methods,
    submitUpsertTiers,
    handleSubmit,
    isFormValid,
    cancelBtnHandler,
    formStep,
    watch,
    apiCallInProgress,
    showLoader,
    isError,
    refetch,
  };
};
