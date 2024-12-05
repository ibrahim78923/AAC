import { useForm } from 'react-hook-form';
import {
  upsertUserDefaultValues,
  upsertUserFormFieldsDynamic,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import {
  UpsertUserFormI,
  UserManagementResponseI,
} from './UpsertUser.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ARRAY_INDEX } from '@/constants/strings';
import { LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT } from '../User.data';
import {
  emptySelectedUsersLists,
  setIsPortalOpen,
  setIsPortalClose,
} from '@/redux/slices/airLoyaltyProgram/users/slice';
import {
  useAddLoyaltyProgramUserManagementSingleProductUserMutation,
  useGetLoyaltyProgramUserManagementSingleProductUserDetailsQuery,
  useUpdateLoyaltyProgramUserManagementSingleProductUserMutation,
  useVerifyLoyaltyProgramUserManagementUserViaIgMutation,
} from '@/services/airLoyaltyProgram/user';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  loyaltyProgramUsersIsPortalOpenSelector,
  loyaltyProgramUsersSelectedUsersListsSelector,
} from '@/redux/slices/airLoyaltyProgram/users/selectors';

const { EDIT_LOYALTY_PROGRAM_USERS, LOYALTY_PROGRAM_USERS_DETAIL } =
  LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT;

export const useUpsertUser = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(loyaltyProgramUsersIsPortalOpenSelector);

  const selectedUsersLists = useAppSelector(
    loyaltyProgramUsersSelectedUsersListsSelector,
  );

  const userId = selectedUsersLists?.[ARRAY_INDEX?.ZERO]?._id;

  const [
    updateLoyaltyProgramUserManagementSingleProductUserTrigger,
    updateLoyaltyProgramUserManagementSingleProductUserStatus,
  ]: any = useUpdateLoyaltyProgramUserManagementSingleProductUserMutation?.();

  const [
    addLoyaltyProgramUserManagementSingleProductUserTrigger,
    addLoyaltyProgramUserManagementSingleProductUserStatus,
  ]: any = useAddLoyaltyProgramUserManagementSingleProductUserMutation?.();

  const [
    verifyLoyaltyProgramUserManagementUserViaIgTrigger,
    verifyLoyaltyProgramUserManagementUserViaIgStatus,
  ] = useVerifyLoyaltyProgramUserManagementUserViaIgMutation();

  const getSingleUserApiParameter = {
    pathParams: {
      id: userId,
    },
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } =
    useGetLoyaltyProgramUserManagementSingleProductUserDetailsQuery(
      getSingleUserApiParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!userId,
      },
    );

  const methods = useForm<any>({
    defaultValues: upsertUserDefaultValues(),
    resolver: yupResolver(upsertUserValidationSchema),
  });

  const { handleSubmit, reset } = methods;

  const submitButtonHandler = () => {
    if (isPortalOpen?.action === LOYALTY_PROGRAM_USERS_DETAIL) {
      dispatch(
        setIsPortalOpen<any>({
          action: EDIT_LOYALTY_PROGRAM_USERS,
          isOpen: true,
        }),
      );
      return;
    }
    handleSubmit(submitUpsertUser)();
  };

  const submitUpsertUser = async (formData: UpsertUserFormI) => {
    if (isPortalOpen?.action === LOYALTY_PROGRAM_USERS_DETAIL) {
      dispatch(
        setIsPortalOpen<any>({
          action: EDIT_LOYALTY_PROGRAM_USERS,
          isOpen: true,
        }),
      );
      return;
    }
    const body = {
      ...formData,
      role: formData?.role?._id,
      team: formData?.team?._id,
      language: formData?.language?._id,
    };

    const apiDataParameter = { body };

    if (isPortalOpen?.action === EDIT_LOYALTY_PROGRAM_USERS) {
      submitUpdateUpsertUser(body);
      return;
    }

    try {
      const response =
        (await addLoyaltyProgramUserManagementSingleProductUserTrigger?.(
          apiDataParameter,
        )?.unwrap()) as UserManagementResponseI;
      const email = {
        email: response?.data?.data?.user?.email,
      };
      closePortal?.();
      await verifyUserViaIg(email?.email);
      successSnackbar('User added successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateUpsertUser = async (formData: UpsertUserFormI) => {
    delete formData?.email;
    const apiDataParameter = {
      body: formData,
      pathParams: {
        id: userId,
      },
    };
    try {
      await updateLoyaltyProgramUserManagementSingleProductUserTrigger?.(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('User updated successfully');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const verifyUserViaIg = async (email?: string) => {
    const apiDataParameter = { email: { email } };
    try {
      await verifyLoyaltyProgramUserManagementUserViaIgTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error) {}
  };

  const disableEmailField = isPortalOpen?.action === EDIT_LOYALTY_PROGRAM_USERS;
  const upsertUserFormFields = upsertUserFormFieldsDynamic?.(disableEmailField);

  const closePortal = () => {
    reset?.();
    dispatch(emptySelectedUsersLists());
    dispatch(setIsPortalClose());
  };

  useEffect(() => {
    reset(() => upsertUserDefaultValues(data?.data));
  }, [data, reset]);

  const apiCallInProgress =
    addLoyaltyProgramUserManagementSingleProductUserStatus?.isLoading ||
    updateLoyaltyProgramUserManagementSingleProductUserStatus?.isLoading ||
    verifyLoyaltyProgramUserManagementUserViaIgStatus?.isLoading;

  return {
    upsertUserFormFields,
    methods,
    closePortal,
    submitButtonHandler,
    isLoading,
    isFetching,
    isError,
    refetch,
    isPortalOpen,
    apiCallInProgress,
  };
};
