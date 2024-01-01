import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchemaAddNewLocation,
  locationDefaultValues,
} from './AddNewLocation.data';
import { AIR_SERVICES } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import {
  usePostChildLocationMutation,
  usePostLocationMutation,
  usePutLocationMutation,
  usePutChildLocationMutation,
} from '@/services/airServices/settings/asset-management/location';

export const useAddNewLocation = () => {
  const router = useRouter();
  const { data, editData, childEditData } = router.query;

  let dataArray, editDataArray, childEditDataArray;
  try {
    dataArray = data ? JSON.parse(data) : [];
    editDataArray = editData ? JSON.parse(editData) : [];
    childEditDataArray = childEditData ? JSON.parse(childEditData) : [];
  } catch {
    dataArray = [];
    editDataArray = [];
    childEditDataArray = [];
  }

  const locationId = dataArray?._id;
  const parentLocationName = dataArray?.parentLocation;
  const editLocationId = editDataArray?._id;
  const childEditLocationId = childEditDataArray?._id;

  const AddNewLocationMethods = useForm({
    resolver: yupResolver(validationSchemaAddNewLocation),
    defaultValues: locationDefaultValues({
      editDataArray,
      parentLocationName,
      childEditDataArray,
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
    const postChildLocationParameter = {
      body: locationData,
      id: locationId,
    };
    try {
      const res: any = await postChildLocationTrigger(
        postChildLocationParameter,
      ).unwrap();
      enqueueSnackbar(res?.message ?? 'Child Location Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      moveToLocationPage();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    AddNewLocationMethods?.reset?.();
  };

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
      const res: any = await postLocationTrigger(locationData).unwrap();
      enqueueSnackbar(res?.message ?? 'Location Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      moveToLocationPage();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    AddNewLocationMethods?.reset?.();
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
      id: editLocationId,
    };
    try {
      const res: any = await putLocationTrigger(putLocationParameter).unwrap();
      enqueueSnackbar(res?.message ?? 'Location Edit Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      moveToLocationPage();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
      id: childEditLocationId,
    };
    try {
      const res: any = await putChildLocationTrigger(
        putChildLocationParameter,
      ).unwrap();
      enqueueSnackbar(res?.message ?? 'Child Location Edit Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      moveToLocationPage();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    AddNewLocationMethods?.reset?.();
  };

  return {
    AddNewLocationMethods,
    moveToLocationPage,
    onSubmit,
    childOnsubmit,
    editOnSubmit,
    locationIsLoading,
    childLocationIsLoading,
    locationId,
    editLocationId,
    childEditLocationId,
    childEditOnSubmit,
  };
};
