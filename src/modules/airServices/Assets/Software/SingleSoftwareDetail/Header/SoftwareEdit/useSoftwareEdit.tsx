import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema, defaultValues } from './SoftwareEdit.data';
import { enqueueSnackbar } from 'notistack';

export default function useSoftwareEdit(props: any) {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues,
  });
  const { handleSubmit } = methods;

  const submitHandler = methods.handleSubmit(() => {
    enqueueSnackbar('Software Updated Successfully', {
      variant: 'success',
    });
    setIsDrawerOpen(false);
    methods.reset(defaultValues);
  });
  const onSubmit = async () => {
    // console.log(data);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    submitHandler,
  };
}
