import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// import { useTheme } from '@mui/material';
import {
  upsertLocationsDefaultValues,
  upsertLocationsFormValidationSchema,
} from './UpsertLocations.data';
import { enqueueSnackbar } from 'notistack';

export const useUpsertLocations = (props: any) => {
  // const theme = useTheme();
  const { onClose } = props;
  const methods = useForm({
    resolver: yupResolver(upsertLocationsFormValidationSchema),
    defaultValues: upsertLocationsDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitUpsertLocationForm = async () => {
    onClose(false);
    enqueueSnackbar('Location Added Successfully', {
      variant: 'success',
    });
  };
  return { methods, handleSubmit, submitUpsertLocationForm };
};
