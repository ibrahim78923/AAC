import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './NewIncident.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

export const useNewIncident = ({ onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    // console.log(data);
    // try {
    //   const res: any = await onSubmitHandler(data).unwrap();
    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
    // } catch (error: any) {
    //   const errMsg = error?.data?.message;
    //   enqueueSnackbar(errMsg ?? "Something Went Wrong!", { variant: "error" });
    // }
  };
  return { handleSubmit, onSubmit, methods };
};
