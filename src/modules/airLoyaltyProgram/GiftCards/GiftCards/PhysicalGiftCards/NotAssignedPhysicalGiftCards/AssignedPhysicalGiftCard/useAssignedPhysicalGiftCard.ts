import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  defaultValues,
  validationSchema,
} from './AssignedPhysicalGiftCard.data';
export const useAssignedPhysicalGiftCard = (props: any) => {
  const { setAssignedTo } = props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Assigned Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    handleCloseDrawer?.();
    reset();
  };
  const handleCloseDrawer = () => {
    reset();
    setAssignedTo(false);
  };
  return { handleSubmit, onSubmit, methods, handleCloseDrawer };
};
