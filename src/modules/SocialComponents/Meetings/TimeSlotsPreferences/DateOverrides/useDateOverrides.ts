import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from '../TimeSlotsPreferences.data';

export const useDateOverrides = (props: any) => {
  const { submittedData, setSubmittedData } = props;
  const [openModule, setOpenModule] = useState(false);
  const [showData, setShowData] = useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
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
    storeFirstObjectById,
  };
};
