import { setIsPortalClose } from '@/redux/slices/airLoyaltyProgram/tiers/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  FORM_STEP_CONSTANT,
  upsertTiersBasicFormFieldsDynamic,
  upsertTiersFormDefaultValue,
  upsertTiersFormValidationSchema,
} from './UpsertTiers.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
  useAddLoyaltyProgramLoyaltySingleTierMutation,
  useUpdateLoyaltyProgramLoyaltySingleTierMutation,
} from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES } from '@/constants/api';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../../RulesAndTiers.constant';

export const useUpsertTiers = () => {
  const [formStep, setFormStep] = useState(FORM_STEP_CONSTANT?.FIRST_STEP);
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramTiers?.isPortalOpen,
  );
  const [
    addLoyaltyProgramLoyaltySingleTierTrigger,
    addLoyaltyProgramLoyaltySingleTierStatus,
  ] = useAddLoyaltyProgramLoyaltySingleTierMutation();

  const [
    updateLoyaltyProgramLoyaltySingleTierTrigger,
    updateLoyaltyProgramLoyaltySingleTierStatus,
  ] = useUpdateLoyaltyProgramLoyaltySingleTierMutation();

  const methods = useForm<any>({
    resolver: yupResolver(upsertTiersFormValidationSchema?.(formStep)),
    defaultValues: upsertTiersFormDefaultValue?.(),
  });

  const { handleSubmit, watch, setValue, clearErrors } = methods;

  const isFormValid =
    !!watch('name') &&
    !!watch('description') &&
    !!watch('amount') &&
    !!watch('points');

  const watchAttribute = watch('attribute');

  useEffect(() => {
    setValue('operator', null);
    setValue('fieldValue', '');
    setValue('contacts', []);
    clearErrors(['operator', 'fieldValue', 'contacts']);
  }, [watchAttribute?._id]);

  const closePortal = () => {
    dispatch(setIsPortalClose());
  };

  const submitUpsertTiers = () => {
    if (formStep === FORM_STEP_CONSTANT?.FIRST_STEP) {
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
    formData?.attribute?._id !==
      LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT &&
      tierFormData.append('operator', formData?.operator?._id);
    formData?.attribute?._id ===
      LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT &&
      tierFormData.append('contacts', formData?.contacts);
    formData?.attribute?._id !==
      LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT &&
      tierFormData.append('fieldValue', formData?.fieldValue);

    if (
      isPortalOpen?.action ===
      RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.EDIT_TIERS
    ) {
      tierFormData?.append('id', isPortalOpen?.data?.id);
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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateTier = async (formData: any) => {
    const tierFormData = formData;
    const apiDataParameter = {
      body: tierFormData,
    };

    try {
      await updateLoyaltyProgramLoyaltySingleTierTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Tier updated successfully');
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
  );

  const apiCallInProgress =
    updateLoyaltyProgramLoyaltySingleTierStatus?.isLoading ||
    addLoyaltyProgramLoyaltySingleTierStatus?.isLoading;

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
  };
};
