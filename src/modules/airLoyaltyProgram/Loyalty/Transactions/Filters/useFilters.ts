import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { filtersDefaultValues, filtersValidationSchema } from './Filters.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useFilters = (setIsFilterDrawerOpen: any) => {
  const methods: any = useForm({
    resolver: yupResolver(filtersValidationSchema),
    defaultValues: filtersDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const submit = async () => {
    enqueueSnackbar('Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    setIsFilterDrawerOpen(false);
  };

  return {
    methods,
    handleSubmit,
    submit,
  };
};
