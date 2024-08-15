import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertTeamDefaultValues,
  upsertTeamFormFieldsDynamic,
  upsertTeamValidationSchema,
} from './UpsertTeams.data';
import {
  useGetTeamsByIdForOperationQuery,
  useLazyGetProductTeamUserListDropdownQuery,
  usePatchTeamUsersForOperationMutation,
  usePostCreateTeamForOperationMutation,
} from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect } from 'react';
import { TeamPortalComponentPropsI } from '../Teams.interface';
import { UpsertTeamsFormI } from './UpsertTeams.interface';

export const useUpsertTeams = (props: TeamPortalComponentPropsI) => {
  const { isPortalOpen, setIsPortalOpen } = props;

  const methods = useForm({
    resolver: yupResolver(upsertTeamValidationSchema),
    defaultValues: upsertTeamDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const usersTeamDropdown = useLazyGetProductTeamUserListDropdownQuery();

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetTeamsByIdForOperationQuery(isPortalOpen?.data?._id, {
      refetchOnMountOrArgChange: true,
      skip: !!!isPortalOpen?.data?._id,
    });

  const [patchTeamUsersForOperationTrigger, patchTeamUsersForOperationStatus] =
    usePatchTeamUsersForOperationMutation();

  const [postCreateTeamForOperationTrigger, postCreateTeamForOperationStatus] =
    usePostCreateTeamForOperationMutation();

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
    setIsPortalOpen({});
    reset?.();
  };

  useEffect(
    () => reset(() => upsertTeamDefaultValues(data?.data)),
    [data?.data, reset],
  );

  const upsertTeamFormFields = upsertTeamFormFieldsDynamic(usersTeamDropdown);

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
  };
};
