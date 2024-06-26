import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  reportsDefaultValues,
  reportsValidationSchema,
} from './SaveReportDrawer.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';

export const useSaveReportDrawer = (props: any) => {
  const { form, setOpen, reportId, setForm } = props;
  const [reportValidation, setReportValidation] = useState<any>({
    selectSharedWith: '',
    selectAddToDashboard: '',
  });

  const saveReportsMethods = useForm({
    resolver: yupResolver<any>(reportsValidationSchema(reportValidation)),
    defaultValues: reportsDefaultValues,
  });

  const { watch, handleSubmit, reset } = saveReportsMethods;

  const selectSharedWith = watch('sharedWith');
  const selectAddToDashboard = watch('addToDashboard');

  useEffect(() => {
    setReportValidation({
      selectSharedWith,
      selectAddToDashboard,
    });
  }, [selectSharedWith, selectAddToDashboard]);

  const onSubmit: any = () => {
    try {
      if (reportId) {
        successSnackbar('Report Edit Successfully');
        setForm([]);
        handleCancel();
      } else {
        successSnackbar('Report Created Successfully');
        setForm([]);
        handleCancel();
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
