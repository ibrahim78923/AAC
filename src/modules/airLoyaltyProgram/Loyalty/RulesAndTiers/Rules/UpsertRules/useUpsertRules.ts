import { useForm, useWatch } from 'react-hook-form';
import { upsertRulesFormFieldsDynamic } from './UpsertRules.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertRules = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { makePath } = usePath();

  const upsertRuleMethod = useForm({
    defaultValues: { attribute: '' },
  });
  const { handleSubmit, control, reset } = upsertRuleMethod;

  const submitUpsertRuleForm = () => {
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

  const upsertRulesFormFields = upsertRulesFormFieldsDynamic?.filter(
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
