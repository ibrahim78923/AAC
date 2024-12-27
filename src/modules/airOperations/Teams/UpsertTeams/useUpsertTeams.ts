import {
  upsertTeamDefaultValues,
  upsertTeamFormFieldsDynamic,
  upsertTeamValidationSchema,
} from './UpsertTeams.data';
import {
  useAddOperationsUserManagementSingleTeamMutation,
  useGetOperationsUserManagementSingleTeamDetailsByIdQuery,
  useUpdateOperationsUserManagementSingleTeamMutation,
} from '@/services/airOperations/user-management/user';
import { useEffect } from 'react';
import { UpsertTeamsFormI } from './UpsertTeams.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airOperations/teams/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertTeams = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsTeam?.isPortalOpen,
  );

  const formLibProps = {
    validationSchema: upsertTeamValidationSchema,
    defaultValues: upsertTeamDefaultValues(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetOperationsUserManagementSingleTeamDetailsByIdQuery(
      isPortalOpen?.data?._id,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!isPortalOpen?.data?._id,
      },
    );

  const [patchTeamUsersForOperationTrigger, patchTeamUsersForOperationStatus] =
    useUpdateOperationsUserManagementSingleTeamMutation();

  const [postCreateTeamForOperationTrigger, postCreateTeamForOperationStatus] =
    useAddOperationsUserManagementSingleTeamMutation();

  const submit = async (data: UpsertTeamsFormI) => {
    const { userAccounts, ...rest } = data;
    const body = {
      ...rest,
      userAccounts: userAccounts?.map((item: any) => item?._id),
    };
    const apiDataParameter = {
      body,
    };

    if (!!isPortalOpen?.data?._id) {
      submitTeamUpdate?.(body);
      return;
    }

    try {
      await postCreateTeamForOperationTrigger(apiDataParameter).unwrap();
      successSnackbar('Team added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitTeamUpdate = async (data: UpsertTeamsFormI) => {
    const apiDataParameter = {
      pathParams: {
        id: isPortalOpen?.data?._id,
      },
      body: data,
    };

    try {
      await patchTeamUsersForOperationTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Team edit successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    dispatch(setIsPortalClose());
    reset?.();
  };

  useEffect(
    () => reset(() => upsertTeamDefaultValues(data?.data)),
    [data?.data, reset],
  );

  const upsertTeamFormFields = upsertTeamFormFieldsDynamic();

  const apiCallInProgress =
    postCreateTeamForOperationStatus?.isLoading ||
    patchTeamUsersForOperationStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    submit,
    postCreateTeamForOperationStatus,
    patchTeamUsersForOperationStatus,
    handleClose,
    upsertTeamFormFields,
    isLoading,
    isFetching,
    isError,
    refetch,
    isPortalOpen,
    apiCallInProgress,
  };
};
