import { useForm, useWatch } from 'react-hook-form';
import {
  upsertRulesFormDefaultValues,
  upsertRulesFormFieldsDynamic,
  upsertRulesFormValidationSchema,
} from './UpsertRules.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { successSnackbar } from '@/utils/api';

export const useUpsertRules = (props: any) => {
  const { setIsDrawerOpen } = props;

  const upsertRuleMethod = useForm<any>({
    resolver: yupResolver(upsertRulesFormValidationSchema),
    defaultValues: upsertRulesFormDefaultValues,
  });

  const { handleSubmit, control, reset, clearErrors, setValue, getValues } =
    upsertRuleMethod;

  const onChangeCustom = (e: any, name: any, dependantField: any) => {
    setValue?.(name, e?.target?.value);
    if (getValues(name) !== '') {
      clearErrors(name);
      clearErrors(dependantField);
    }
  };

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

  useEffect(() => {
    clearErrors();
  }, [watchForAttribute]);

  const upsertRulesFormFields = upsertRulesFormFieldsDynamic(
    onChangeCustom,
    watchForLoyaltyType,
  )?.filter(
    (formField: any) =>
      formField?.attributeType?.includes(watchForAttribute?.label),
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
