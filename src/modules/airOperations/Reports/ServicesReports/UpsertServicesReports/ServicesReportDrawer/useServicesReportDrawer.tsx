import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  reportsDefaultValues,
  reportsValidationSchema,
} from './ServicesReportDrawer.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useServicesReportDrawer = (props: any) => {
  const { form, setOpen, reportId } = props;
  const saveReportsMethods = useForm({
    resolver: yupResolver(reportsValidationSchema),
    defaultValues: reportsDefaultValues,
  });

  const { watch, handleSubmit, reset } = saveReportsMethods;

  const onSubmit = () => {
    try {
      if (reportId) {
        successSnackbar('Report Edit Successfully');
      } else {
        successSnackbar('Report Created Successfully');
      }
    } catch (err: any) {
      errorSnackbar(err?.message ?? 'Error in saving report');
    }
  };
  const handleCancel = () => {
    reset();
    setOpen(false);
  };
  return {
    saveReportsMethods,
    watch,
    handleSubmit,
    onSubmit,
    handleCancel,
    form,
  };
};
