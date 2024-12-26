import {
  validationSchemaAddNewLocation,
  locationDefaultValues,
  LOCATION_TYPE,
} from './UpsertLocation.data';
import { AIR_SERVICES } from '@/constants/routes';
import { useRouter } from 'next/router';
import {
  usePostChildLocationMutation,
  usePostLocationMutation,
  usePutLocationMutation,
  useGetByIdLocationQuery,
} from '@/services/airServices/settings/asset-management/location';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useEffect } from 'react';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';

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

  const { reset, handleSubmit, methods } = useFormLib({
    validationSchema: validationSchemaAddNewLocation,
    defaultValues: locationDefaultValues(),
  });

  const [postLocationTrigger, postLocationStatus] = usePostLocationMutation();
  const [postChildLocationTrigger, postChildLocationStatus] =
    usePostChildLocationMutation();
  const [putLocationTrigger, putLocationStatus] = usePutLocationMutation();

  const moveToLocationPage = () => {
    router?.push({
      pathname: AIR_SERVICES?.LOCATION_SETTINGS,
    });
  };

  const upsertLocation = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues?.(data);

    if (type === LOCATION_TYPE?.CHILD) {
      upsertChildLocation?.(filteredEmptyData);
      return;
    }

    delete filteredEmptyData?.parentLocation;
    const parentLocationApiData = {
      body: filteredEmptyData,
    };
    if (!!parentId) {
      editLocation?.(filteredEmptyData);
      return;
    }

    try {
      await postLocationTrigger(parentLocationApiData)?.unwrap();
      successSnackbar('Location Added Successfully');
      handleCancel();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const upsertChildLocation = async (data: any) => {
    const postChildLocationParameter = {
      body: data,
      id: parentId,
    };

    if (!!childId) {
      editLocation?.(data);
      return;
    }

    try {
      await postChildLocationTrigger(postChildLocationParameter)?.unwrap();
      successSnackbar('Child Location Added Successfully');
      handleCancel();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const editLocation = async (filteredEmptyData: any) => {
    const putLocationParameter = {
      body: filteredEmptyData,
      id: data?.data?._id,
    };

    try {
      await putLocationTrigger(putLocationParameter)?.unwrap();
      successSnackbar('Location Updated Successfully');
      handleCancel();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const handleCancel = () => {
    reset();
    moveToLocationPage();
  };

  useEffect(() => {
    reset(() => locationDefaultValues(data?.data, router?.query));
  }, [data, reset, type]);

  return {
    methods,
    moveToLocationPage,
    parentId,
    childId,
    handleCancel,
    type,
    isLoading,
    isFetching,
    upsertLocation,
    handleSubmit,
    postLocationStatus,
    putLocationStatus,
    postChildLocationStatus,
  };
};
