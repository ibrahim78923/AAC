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
import { usePostAddLocationMutation } from '@/services/airServices/settings/asset-management/location';

export const useAddNewLocation = () => {
  const router = useRouter();
  const AddNewLocationMethods = useForm({
    resolver: yupResolver(validationSchemaAddNewLocation),
    defaultValues,
  });
  const [location] = usePostAddLocationMutation();
  const onSubmit = async (data: any) => {
    const locationData = {
      locationName: data?.locationName,
      parentLocation: data?.parentLocation,
      contactName: data?.contactName,
      email: data?.email,
      phone: data?.phone,
      address: {
        addressLine1: data?.addressLine1,
        addressLine2: data?.addressLine2,
        city: data?.city,
        country: data?.country,
        state: data?.state,
        zipCode: data?.zipCode,
      },
    };
    try {
      const res: any = await location(locationData);
      enqueueSnackbar(res?.message ?? 'New Location Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
