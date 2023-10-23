import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';

import {
  gpDetailsInfoFormSchema,
  dataArray,
  defaultValues,
  defaultValuesFunction,
} from './PlanForm.data';

export const useAddPlanForm = () => {
  const router = useRouter();

  const formDefaultValuesFunction = dataArray(router?.query?.action === 'view');

  const methods: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValuesFunction(defaultValues),
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('', {
      variant: 'success',
    });
  };

  return {
    formDefaultValuesFunction,
    handleSubmit,
    methods,
    onSubmit,
  };
};
