import { useForm, useWatch } from 'react-hook-form';
import {
  upsertRulesFormDefaultValues,
  upsertRulesFormFieldsDynamic,
  upsertRulesFormValidationSchema,
} from './UpsertRules.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export const useUpsertRules = (props: any) => {
  const { setIsDrawerOpen, setActiveTab } = props;
  const router = useRouter();
  const { makePath } = usePath();

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
    setActiveTab(1);
    enqueueSnackbar('Rules created successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeUpsertRule();
  };

  const watchForAttribute = useWatch({
    control,
    name: 'attribute',
    defaultValue: '',
  });

  useEffect(() => {
    clearErrors();
  }, [watchForAttribute]);

  const upsertRulesFormFields = upsertRulesFormFieldsDynamic(
    onChangeCustom,
  )?.filter(
    (formField: any) => formField?.attributeType?.includes(watchForAttribute),
  );

  const closeUpsertRule = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['rulesAndTierAction'],
      }),
    );
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
