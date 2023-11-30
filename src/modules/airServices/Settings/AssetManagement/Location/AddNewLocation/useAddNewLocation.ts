import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchemaAddNewLocation,
  defaultValues,
} from './AddNewLocation.data';
import { AIR_SERVICES } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';

export const useAddNewLocation = () => {
  const router = useRouter();
  const AddNewLocationMethods = useForm({
    resolver: yupResolver(validationSchemaAddNewLocation),
    defaultValues,
  });

  const onSubmit = () => {
    enqueueSnackbar('New Location Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    AddNewLocationMethods?.reset?.();
  };
  const moveToLocationPage = () => {
    router?.push({
      pathname: AIR_SERVICES?.LOCATION_SETTINGS,
    });
  };
  return {
    AddNewLocationMethods,
    moveToLocationPage,
    onSubmit,
  };
};
