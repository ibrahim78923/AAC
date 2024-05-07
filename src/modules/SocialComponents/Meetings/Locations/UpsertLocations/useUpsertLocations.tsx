import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertLocationsDefaultValues,
  upsertLocationsFormValidationSchema,
} from './UpsertLocations.data';
import { enqueueSnackbar } from 'notistack';

export const useUpsertLocations = (props: any) => {
  const { onClose, isUpdate } = props;
  const methods = useForm({
    resolver: yupResolver(upsertLocationsFormValidationSchema),
    defaultValues: upsertLocationsDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitUpsertLocationForm = async () => {
    onClose();
    enqueueSnackbar(
      isUpdate
        ? 'Location Updated Successfully'
        : 'Location Added Successfully',
      {
        variant: 'success',
      },
    );
  };
  return {
    methods,
    handleSubmit,
    submitUpsertLocationForm,
  };
};
