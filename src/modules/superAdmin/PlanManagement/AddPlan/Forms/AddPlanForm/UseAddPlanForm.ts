import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';

import {
  gpDetailsInfoFormSchema,
  dataArray,
  defaultValues,
  defaultValuesFunction,
} from './AddPlanForm.data';

export const useAddPlanForm = () => {
  const router = useRouter();

  const formDefaultValuesFunction = dataArray(router?.query?.action === 'view');

  const methods: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValuesFunction(defaultValues),
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    // console.log(data);
    // try {
    //   const res: any = await onSubmitHandler(data).unwrap();
    enqueueSnackbar('', {
      variant: 'success',
    });
    // ahdsa;iljd sapjdsa;kd sa;kd
    // } catch (error: any) {
    //   const errMsg = error?.data?.message;
    //   enqueueSnackbar(errMsg ?? "Something Went Wrong!", { variant: "error" });
    // }
  };

  return {
    formDefaultValuesFunction,
    handleSubmit,
    methods,
    onSubmit,
  };
};
