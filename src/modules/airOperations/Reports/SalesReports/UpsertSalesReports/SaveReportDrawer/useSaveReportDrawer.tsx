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

  const { watch, handleSubmit, reset, setValue } = saveReportsMethods;

  const ADD_TO = {
    ADD_TO_EXISTING: 'addToExisting',
    DO_NOT_ADD: 'doNotAdd',
    ADD_TO_NEW_CONDITION_TWO: 'addToNewConditionTwo',
    ADD_TO_DASHBOARD: 'addToDashboard',
    SHARED_WITH: 'sharedWith',
  };

  const selectSharedWith = watch(ADD_TO?.SHARED_WITH);
  const selectAddToDashboard = watch(ADD_TO?.ADD_TO_DASHBOARD);
  const selectAddToNewDashboard = watch(ADD_TO?.ADD_TO_NEW_CONDITION_TWO);

  useEffect(() => {
    setReportValidation({
      selectSharedWith,
      selectAddToDashboard,
      selectAddToNewDashboard,
    });
    if (
      selectAddToDashboard === ADD_TO?.ADD_TO_EXISTING ||
      selectAddToDashboard === ADD_TO?.DO_NOT_ADD
    ) {
      setValue(ADD_TO?.ADD_TO_NEW_CONDITION_TWO, null);
    }
  }, [selectSharedWith, selectAddToDashboard, selectAddToNewDashboard]);

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
    selectAddToNewDashboard,
  };
};
