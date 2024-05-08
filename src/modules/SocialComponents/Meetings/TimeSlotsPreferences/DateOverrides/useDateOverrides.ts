import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { overridesDefaultValues } from '../AddDateOverrides/AddDateOverrides.data';

export const useDateOverrides = () => {
  const [openModule, setOpenModule] = useState(false);
  const [showData, setShowData] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>([]);

  const methods = useForm({
    defaultValues: overridesDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      await methods?.trigger();
      successSnackbar('Override Date Added Successfully');
      setSubmittedData((prevData: any) => [...prevData, data]);
      if (submittedData?.length === 0) {
        setShowData(true);
      }
      setOpenModule(false);
    } catch (error) {
      errorSnackbar();
    }
  };

  const storeFirstObjectById = (_id: string) => {
    submittedData?.find((obj: any) => obj?._id === _id);
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
    storeFirstObjectById,
  };
};
