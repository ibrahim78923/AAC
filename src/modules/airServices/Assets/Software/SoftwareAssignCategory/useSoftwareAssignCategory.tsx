import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  assignCategoryValidationSchema,
  assignCategoryDefaultValues,
} from './SoftwareAssignCategory.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useSoftwareAssignCategory = (setOpenAssignModal: any) => {
  const methods: any = useForm<any>({
    resolver: yupResolver(assignCategoryValidationSchema),
    defaultValues: assignCategoryDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Category Assign Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    setOpenAssignModal?.(false);
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
  };
};
