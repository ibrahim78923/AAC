import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import * as Yup from 'yup';

export const useRenameReport = (props: any) => {
  const { setIsPortalOpen, setSelectedReportList } = props;

  const methods: any = useForm<any>({
    resolver: yupResolver(
      Yup?.object()?.shape({
        category: Yup?.mixed()?.required('Report name is required'),
      }),
    ),
    defaultValues: { name: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    try {
      successSnackbar('Report renamed Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    setIsPortalOpen?.({});
    setSelectedReportList?.([]);
  };

  return {
    onSubmit,
    handleSubmit,
    methods,
    handleClose,
  };
};
