import { useForm } from 'react-hook-form';
import {
  upsertUserDefaultValues,
  upsertUserFormFieldsDynamic,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect } from 'react';
import {
  useAddOperationsUserManagementSingleProductUserMutation,
  useGetOperationsUserManagementSingleProductUserDetailsQuery,
  useUpdateOperationsUserManagementSingleProductUserMutation,
} from '@/services/airOperations/user-management/user';
import {
  UpsertUserFormI,
  UserManagementResponseI,
} from './UpsertUser.interface';
import { useAuthCompanyVerificationMutation } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ARRAY_INDEX } from '@/constants/strings';
import { OPERATIONS_USERS_ACTIONS_CONSTANT } from '../User.data';
import {
  emptySelectedUsersLists,
  setIsPortalOpen,
  setIsPortalClose,
} from '@/redux/slices/airOperations/users/slice';

const { ZERO } = ARRAY_INDEX;

const { EDIT_OPERATIONS_USERS, OPERATIONS_USERS_DETAIL } =
  OPERATIONS_USERS_ACTIONS_CONSTANT;

export const useUpsertUser = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsUsersLists?.isPortalOpen,
  );

  const selectedUsersLists = useAppSelector(
    (state) => state?.operationsUsersLists?.selectedUsersLists,
  );

  const userId = selectedUsersLists?.[ZERO]?._id;

  const [
    updateProductUserForOperationTrigger,
    updateProductUserForOperationStatus,
  ]: any = useUpdateOperationsUserManagementSingleProductUserMutation?.();

  const [
    addProductUserForOperationTrigger,
    addProductUserForOperationStatus,
  ]: any = useAddOperationsUserManagementSingleProductUserMutation?.();

  const [igVerificationTrigger, igVerificationStatus] =
    useAuthCompanyVerificationMutation();

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
    useGetOperationsUserManagementSingleProductUserDetailsQuery(
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
    if (isPortalOpen?.action === OPERATIONS_USERS_DETAIL) {
      dispatch(
        setIsPortalOpen<any>({
          action: EDIT_OPERATIONS_USERS,
          isOpen: true,
        }),
      );
      return;
    }
    handleSubmit(submitUpsertUser)();
  };

  const submitUpsertUser = async (formData: UpsertUserFormI) => {
    if (isPortalOpen?.action === OPERATIONS_USERS_DETAIL) {
      dispatch(
        setIsPortalOpen<any>({
          action: EDIT_OPERATIONS_USERS,
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

    if (isPortalOpen?.action === EDIT_OPERATIONS_USERS) {
      submitUpdateUpsertUser(body);
      return;
    }

    try {
      const response = (await addProductUserForOperationTrigger?.(
        apiDataParameter,
      )?.unwrap()) as UserManagementResponseI;
      const email = {
        email: response?.data?.data?.user?.email,
      };
      await igVerificationTrigger({ email })?.unwrap();
      successSnackbar('User added successfully');
      closeOperationUserForm?.();
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
      await updateProductUserForOperationTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('User updated successfully');
      closeOperationUserForm?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const disableEmailField = isPortalOpen?.action === EDIT_OPERATIONS_USERS;
  const upsertUserFormFields = upsertUserFormFieldsDynamic?.(disableEmailField);

  const closeOperationUserForm = () => {
    reset?.();
    dispatch(emptySelectedUsersLists());
    dispatch(setIsPortalClose());
  };

  useEffect(() => {
    reset(() => upsertUserDefaultValues(data?.data));
  }, [data, reset]);

  return {
    upsertUserFormFields,
    handleSubmit,
    submitUpsertUser,
    methods,
    addProductUserForOperationStatus,
    updateProductUserForOperationStatus,
    closeOperationUserForm,
    submitButtonHandler,
    isLoading,
    isFetching,
    isError,
    refetch,
    igVerificationStatus,
    isPortalOpen,
  };
};
