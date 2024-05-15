import { useForm, useWatch } from 'react-hook-form';
import {
  operatorExists,
  timeSpanExists,
  upsertRulesFormDefaultValues,
  upsertRulesFormFieldsDynamic,
  upsertRulesFormValidationSchema,
} from './UpsertRules.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAddRulesMutation,
  useLazyGetTiersDropdownForRulesQuery,
} from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import {
  LOYALTY_TIERS_REWARD_TYPE,
  RULES_BENEFIT_TYPE,
  RULES_TIME_SPAN,
} from '@/constants/strings';

export const useUpsertRules = (props: any) => {
  const [hasAudience, setHasAudience] = useState('');
  const { setIsDrawerOpen } = props;

  const [addRulesTrigger, addRulesStatus] = useAddRulesMutation();

  const upsertRuleMethod = useForm<any>({
    resolver: yupResolver(upsertRulesFormValidationSchema),
    defaultValues: upsertRulesFormDefaultValues,
  });

  const { handleSubmit, control, reset, clearErrors, setValue } =
    upsertRuleMethod;

  const submitUpsertRuleForm = async (formData: any) => {
    const timeSpan = {
      type: formData?.timeSpanOf?._id,
      ...(formData?.timeSpanOf?._id === RULES_TIME_SPAN?.CUSTOM_DATE
        ? {
            startDate: formData?.customDate?.startDate?.toISOString(),
            endDate: formData?.customDate?.endDate?.toISOString(),
          }
        : {}),
    };

    const operator = {
      operator: formData?.operator?._id,
      attributeValue: +formData?.attributeValue,
    };

    const body = {
      type: hasAudience,
      attribute: formData?.attribute?._id,
      description: formData?.description,
      tierId: formData?.appliedTo?._id,
      rewardType:
        formData?.loyaltyType === RULES_BENEFIT_TYPE?.DISCOUNT
          ? formData?.discountType?._id
          : LOYALTY_TIERS_REWARD_TYPE?.POINTS,
      rewards: +formData?.rewards,
      ...(timeSpanExists?.includes(formData?.attribute?._id)
        ? { timeSpan }
        : {}),
      ...(operatorExists?.includes(formData?.attribute?._id)
        ? { ...operator }
        : {}),
    };

    const apiDataParameter = {
      body,
    };

    try {
      await addRulesTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Rules added successfully');
      closeUpsertRule();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const watchForAttribute = useWatch({
    control,
    name: 'attribute',
    defaultValue: null,
  });

  const watchForLoyaltyType = useWatch({
    control,
    name: 'loyaltyType',
    defaultValue: '',
  });

  const watchForTimeSpan = useWatch({
    control,
    name: 'timeSpanOf',
    defaultValue: null,
  });

  const watchForDiscountType = useWatch({
    control,
    name: 'discountType',
    defaultValue: null,
  });

  useEffect(() => {
    clearErrors();
    reset();
    setValue?.('attribute', watchForAttribute);
  }, [watchForAttribute?._id]);

  const apiQueryTiers = useLazyGetTiersDropdownForRulesQuery?.();

  const upsertRulesFormFields = upsertRulesFormFieldsDynamic(
    watchForLoyaltyType,
    apiQueryTiers,
    watchForTimeSpan,
    watchForAttribute,
    watchForDiscountType,
  )?.filter(
    (formField: any) =>
      formField?.attributeType?.includes(watchForAttribute?._id),
  );

  const closeUpsertRule = () => {
    reset?.();
    setIsDrawerOpen?.(false);
    setHasAudience?.('');
  };

  const setAudienceType = (type: any) => {
    setHasAudience?.(type?._id);
  };

  return {
    closeUpsertRule,
    upsertRuleMethod,
    handleSubmit,
    submitUpsertRuleForm,
    upsertRulesFormFields,
    watchForAttribute,
    hasAudience,
    setAudienceType,
    addRulesStatus,
  };
};
