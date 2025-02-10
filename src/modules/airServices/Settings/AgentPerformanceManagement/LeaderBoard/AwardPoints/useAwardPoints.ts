import { awardFormDefaultValue, awardPointsSchema } from './AwardPoints.data';
import {
  useAddAirServicesSettingsLeaderBoardAwardPointsMutation,
  useGetAirServicesSettingsLeaderBoardAwardPointsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/award-points';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { ARRAY_INDEX } from '@/constants/strings';
import { useFormLib } from '@/hooks/useFormLib';
import { AIR_SERVICES } from '@/constants/routes';

export const useAwardPoints = () => {
  const router = useRouter();

  const [addAwardPointsTrigger, addAwardPointsStatus] =
    useAddAirServicesSettingsLeaderBoardAwardPointsMutation();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAirServicesSettingsLeaderBoardAwardPointsQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const formLibProps = {
    validationSchema: awardPointsSchema,
    defaultValues: awardFormDefaultValue?.(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const submitAwardForm = async (values: any) => {
    try {
      await addAwardPointsTrigger(values)?.unwrap();
      successSnackbar('Award points added successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => awardFormDefaultValue(data?.data?.[ARRAY_INDEX?.ZERO]));
  }, [data, reset]);

  const handleCancelBtn = () =>
    router?.push({
      pathname: AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS,
    });

  return {
    methods,
    handleSubmit,
    isLoading,
    isFetching,
    addAwardPointsStatus,
    router,
    submitAwardForm,
    isError,
    refetch,
    handleCancelBtn,
  };
};
