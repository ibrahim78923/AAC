import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  changeStatusDefaultValues,
  changeStatusValidationSchema,
} from './ChangeStatus.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useChangeStatus = (prop: any) => {
  const { openStatus, setOpenStatus } = prop;
  const methodChangeStatus = useForm({
    resolver: yupResolver(changeStatusValidationSchema),
    defaultValues: changeStatusDefaultValues,
  });
  const { handleSubmit } = methodChangeStatus;
  const onSubmit = () => {
    setOpenStatus(false);
    enqueueSnackbar('Service Change Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    methodChangeStatus,
    handleSubmit,
    onSubmit,
    openStatus,
    setOpenStatus,
  };
};
export default useChangeStatus;
