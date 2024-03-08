import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchemaAddNewLocation,
  locationDefaultValues,
} from './AddNewLocation.data';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import {
  usePostChildLocationMutation,
  usePostLocationMutation,
  usePutLocationMutation,
  usePutChildLocationMutation,
  useGetByIdLocationQuery,
} from '@/services/airServices/settings/asset-management/location';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddNewLocation = () => {
  const router = useRouter();
  const { parentId, childId }: any = router.query;
  const { data } = useGetByIdLocationQuery(parentId);

  const parentLocationName = data?.data?.locationName;
  const AddNewLocationMethods = useForm({
    resolver: yupResolver(validationSchemaAddNewLocation),
    defaultValues: locationDefaultValues({
      parentLocationName,
    }),
  });
  const [postLocationTrigger, postLocationProgress] = usePostLocationMutation();
  const [postChildLocationTrigger, postChildLocationProgress] =
    usePostChildLocationMutation();
  const [putLocationTrigger] = usePutLocationMutation();
  const [putChildLocationTrigger] = usePutChildLocationMutation();

  const locationIsLoading = postLocationProgress?.isLoading;
  const childLocationIsLoading = postChildLocationProgress?.isLoading;

  const moveToLocationPage = () => {
    router?.push({
      pathname: AIR_SERVICES?.LOCATION_SETTINGS,
    });
  };

  const childOnsubmit = async (data: any) => {
    const locationData = {
      locationName: data?.locationName,
      parentLocation: data?.parentLocation ?? '',
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
    const postChildLocationParameter = {
      body: locationData,
      id: parentId,
    };
    try {
      await postChildLocationTrigger(postChildLocationParameter).unwrap();
      successSnackbar('Child Location Added Successfully');
      moveToLocationPage();
    } catch (error: any) {
      errorSnackbar();
    }
    AddNewLocationMethods?.reset?.();
  };

  const onSubmit = async (data: any) => {
    const locationData = {
      locationName: data?.locationName,
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
      await postLocationTrigger(locationData).unwrap();
      successSnackbar('Location Added Successfully');
      AddNewLocationMethods?.reset?.();
      moveToLocationPage();
      AddNewLocationMethods?.reset?.();
    } catch (error: any) {
      errorSnackbar();
    }
  };

  const editOnSubmit = async (data: any) => {
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
    const putLocationParameter = {
      body: locationData,
      id: parentId,
    };
    try {
      await putLocationTrigger(putLocationParameter).unwrap();
      successSnackbar('Location Edit Successfully');
      moveToLocationPage();
    } catch (error: any) {
      errorSnackbar();
    }
    AddNewLocationMethods?.reset?.();
  };

  const childEditOnSubmit = async (data: any) => {
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
    const putChildLocationParameter = {
      body: locationData,
      id: childId,
    };
    try {
      await putChildLocationTrigger(putChildLocationParameter).unwrap();
      successSnackbar('Child Location Edit Successfully');
      moveToLocationPage();
    } catch (error: any) {
      errorSnackbar();
    }
    AddNewLocationMethods?.reset?.();
  };
  const handleCancel = () => {
    AddNewLocationMethods?.reset?.();
    moveToLocationPage();
  };

  return {
    AddNewLocationMethods,
    moveToLocationPage,
    onSubmit,
    childOnsubmit,
    editOnSubmit,
    locationIsLoading,
    childLocationIsLoading,
    parentId,
    childId,
    childEditOnSubmit,
    handleCancel,
    parentLocationName,
  };
};
