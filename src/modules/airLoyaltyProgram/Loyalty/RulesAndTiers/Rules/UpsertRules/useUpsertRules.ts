import { useForm, useWatch } from 'react-hook-form';
import {
  upsertRulesFormDefaultValues,
  upsertRulesFormFieldsDynamic,
  upsertRulesFormValidationSchema,
} from './UpsertRules.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { successSnackbar } from '@/utils/api';
import { useLazyGetTiersDropdownForRulesQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';

export const useUpsertRules = (props: any) => {
  const { setIsDrawerOpen } = props;

  const upsertRuleMethod = useForm<any>({
    resolver: yupResolver(upsertRulesFormValidationSchema),
    defaultValues: upsertRulesFormDefaultValues,
  });

  const { handleSubmit, control, reset, clearErrors, setValue } =
    upsertRuleMethod;

  const submitUpsertRuleForm = () => {
    successSnackbar('Rules created successfully');
    closeUpsertRule();
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
  };

  return {
    closeUpsertRule,
    upsertRuleMethod,
    handleSubmit,
    submitUpsertRuleForm,
    upsertRulesFormFields,
    watchForAttribute,
  };
};
