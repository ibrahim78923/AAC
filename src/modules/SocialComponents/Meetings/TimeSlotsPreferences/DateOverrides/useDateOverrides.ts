import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { overridesDefaultValues } from '../AddDateOverrides/AddDateOverrides.data';

export const useDateOverrides = () => {
  const [openModule, setOpenModule] = useState(false);
  const [showData, setShowData] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const methods = useForm({
    defaultValues: overridesDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      await methods?.trigger();
      successSnackbar('Override Date Added Successfully');
      setSubmittedData(data);
      setShowData(true);
      setOpenModule(false);
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    openModule,
    setOpenModule,
    showData,
    setShowData,
    methods,
    handleSubmit,
    onSubmit,
    submittedData,
  };
};
