import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchemaAddNewLocation,
  locationDefaultValues,
} from './UpsertLocation.data';
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
import { useEffect } from 'react';

export const useUpsertLocation = () => {
  const router = useRouter();
  const { parentId, childId, type }: any = router?.query;

  const apiDataParameter = {
    queryParams: {
      id: !!childId ? childId : parentId,
    },
  };

  const { data, isLoading, isFetching } = useGetByIdLocationQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!parentId && !!!childId,
    },
  );
  // const { data: childData } = useGetByIdLocationQuery(childId);
  // const childData: any = {};
  // const childLocationData = childData?.data;
  // const locationData = data?.data;
  // const parentD = { parentLocation: locationData?.locationName };

  const AddNewLocationMethods = useForm({
    resolver: yupResolver(validationSchemaAddNewLocation),
    defaultValues: locationDefaultValues(),
  });
  const { reset } = AddNewLocationMethods;
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
    const postChildLocationParameter = {
      body: data,
      id: parentId,
    };
    try {
      await postChildLocationTrigger(postChildLocationParameter).unwrap();
      successSnackbar('Child Location Added Successfully');
      moveToLocationPage();
    } catch (error: any) {
      errorSnackbar();
    }
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      await postLocationTrigger(data).unwrap();
      successSnackbar('Location Added Successfully');
      moveToLocationPage();
      reset();
    } catch (error: any) {
      errorSnackbar();
    }
  };

  const editOnSubmit = async (data: any) => {
    const putLocationParameter = {
      body: data,
      id: parentId,
    };
    try {
      await putLocationTrigger(putLocationParameter).unwrap();
      successSnackbar('Location Edit Successfully');
      moveToLocationPage();
    } catch (error: any) {
      errorSnackbar();
    }
    reset();
  };

  const childEditOnSubmit = async (data: any) => {
    const putChildLocationParameter = {
      body: data,
      id: childId,
    };
    try {
      await putChildLocationTrigger(putChildLocationParameter).unwrap();
      successSnackbar('Child Location Edit Successfully');
      moveToLocationPage();
    } catch (error: any) {
      errorSnackbar();
    }
    reset();
  };
  const handleCancel = () => {
    reset();
    moveToLocationPage();
  };

  useEffect(() => {
    reset(() => locationDefaultValues(data?.data));
  }, [data, reset]);

  let handleSubmit;
  if (type === 'parent-edit') {
    handleSubmit = editOnSubmit;
  } else if (type === 'child') {
    handleSubmit = childOnsubmit;
  } else if (type === 'child-edit') {
    handleSubmit = childEditOnSubmit;
  } else {
    handleSubmit = onSubmit;
  }
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
    type,
    handleSubmit,
    isLoading,
    isFetching,
  };
};
