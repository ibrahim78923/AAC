import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertLocationsDefaultValues,
  upsertLocationsFormValidationSchema,
} from './UpsertLocations.data';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useUpsertLocations = (props: any) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { setIsAddDrawerOpen } = props;
  const methods = useForm({
    resolver: yupResolver(upsertLocationsFormValidationSchema),
    defaultValues: upsertLocationsDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitUpsertLocationForm = async () => {
    setIsAddDrawerOpen(false);
    enqueueSnackbar('Location Added Successfully', {
      variant: 'success',
    });
  };
  return {
    methods,
    handleSubmit,
    submitUpsertLocationForm,
    isUpdate,
    setIsUpdate,
  };
};
