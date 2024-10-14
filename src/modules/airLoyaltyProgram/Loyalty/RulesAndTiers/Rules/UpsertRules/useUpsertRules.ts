import { useForm } from 'react-hook-form';
import {
  ATTRIBUTE_FIELDS,
  TIME_SPAN_FIELDS,
  upsertRulesFormDefaultValues,
  upsertRulesFormFieldsDynamic,
  upsertRulesFormValidationSchema,
} from './UpsertRules.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAddLoyaltyProgramLoyaltySingleRuleMutation } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import {
  LOYALTY_PROGRAM_RULES_BENEFIT_TYPE,
  LOYALTY_PROGRAM_RULES_TIME_SPAN,
  LOYALTY_PROGRAM_TIERS_REWARD_TYPE,
} from '@/constants/api';
import { useGetRulesLists } from '../RulesHooks/useGetRulesLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { isoDateString } from '@/utils/dateTime';

export const useUpsertRules = () => {
  const { getLoyaltyProgramRulesList } = useGetRulesLists?.();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramRules?.isPortalOpen,
  );

  const [
    addLoyaltyProgramLoyaltySingleRuleTrigger,
    addLoyaltyProgramLoyaltySingleRuleStatus,
  ] = useAddLoyaltyProgramLoyaltySingleRuleMutation();

  const methods = useForm<any>({
    resolver: yupResolver(upsertRulesFormValidationSchema),
    defaultValues: upsertRulesFormDefaultValues?.(isPortalOpen?.data),
  });

  const { handleSubmit, reset, clearErrors, setValue, watch } = methods;

  const submitUpsertRuleForm = async (formData: any) => {
    const timeSpan = {
      type: formData?.timeSpanOf?._id,
      ...(formData?.timeSpanOf?._id ===
      LOYALTY_PROGRAM_RULES_TIME_SPAN?.CUSTOM_DATE
        ? {
            startDate: isoDateString(formData?.customDate?.startDate),
            endDate: isoDateString(formData?.customDate?.endDate),
          }
        : {}),
    };

    const operator = {
      operator: formData?.operator?._id,
      attributeValue: +formData?.attributeValue,
    };

    const body = {
      type: 'CUSTOMER', //TODO : will delete when api update acc 2 new requirements
      attribute: formData?.attribute?._id,
      description: formData?.description,
      tierId: formData?.appliedTo?._id,
      rewardType:
        formData?.loyaltyType === LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.DISCOUNT
          ? formData?.discountType?._id
          : LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.POINTS,
      rewards: +formData?.rewards,
      ...(!!TIME_SPAN_FIELDS?.[formData?.attribute?._id] ? { timeSpan } : {}),
      ...(!!ATTRIBUTE_FIELDS?.[formData?.attribute?._id]
        ? { ...operator }
        : {}),
    };

    const apiDataParameter = {
      body,
    };

    try {
      await addLoyaltyProgramLoyaltySingleRuleTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar?.('Rules added successfully');
      closePortal();
      await getLoyaltyProgramRulesList?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const watchForAttribute = watch('attribute');
  const watchForLoyaltyType = watch('loyaltyType');
  const watchForTimeSpan = watch('timeSpanOf');
  const watchForDiscountType = watch('discountType');

  useEffect(() => {
    clearErrors();
    reset();
    setValue?.('attribute', watchForAttribute);
  }, [watchForAttribute?._id, reset]);

  const upsertRulesFormFields = upsertRulesFormFieldsDynamic(
    watchForLoyaltyType,
    watchForTimeSpan,
    watchForAttribute,
    watchForDiscountType,
  );

  const closePortal = () => {
    reset?.();
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress = addLoyaltyProgramLoyaltySingleRuleStatus?.isLoading;

  return {
    closePortal,
    handleSubmit,
    submitUpsertRuleForm,
    methods,
    upsertRulesFormFields,
    watchForAttribute,
    apiCallInProgress,
    isPortalOpen,
  };
};
