import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  filterContractsFormValidationSchema,
  defaultValues,
} from './FilterContractsForm.data';
import { enqueueSnackbar } from 'notistack';

export const useFilterContractsForm = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methods = useForm({
    resolver: yupResolver(filterContractsFormValidationSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Save Successfully', {
      variant: 'success',
    });
    setIsDrawerOpen(false);
  };
  return {
    methods,
    filterContractsFormValidationSchema,
    defaultValues,
    handleSubmit,
    onSubmit,
  };
};
