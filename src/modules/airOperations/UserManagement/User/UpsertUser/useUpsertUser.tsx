import { useForm } from 'react-hook-form';
import {
  upsertUserDefaultValues,
  upsertUserFormFieldsDynamic,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect } from 'react';
import { PAGINATION } from '@/config';
import { ARRAY_INDEX } from '@/constants/strings';
import {
  useAddProductUserForOperationMutation,
  useGetSingleProductUserDetailForOperationQuery,
  useLazyGetPermissionsRoleForUpsertOperationUserQuery,
  useLazyGetTeamDropdownForOperationUserListQuery,
  useUpdateProductUserForOperationMutation,
} from '@/services/airOperations/user-management/user';
import { UserPortalComponentPropsI } from '../User.interface';
import { RoleApiQueryParamsI, UpsertUserFormI } from './UpsertUser.interface';

export const useUpsertUser = (props: UserPortalComponentPropsI) => {
  const { setIsPortalOpen, isPortalOpen, userId, setSelectedUserList } = props;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const [
    updateProductUserForOperationTrigger,
    updateProductUserForOperationStatus,
  ]: any = useUpdateProductUserForOperationMutation?.();

  const [
    addProductUserForOperationTrigger,
    addProductUserForOperationStatus,
  ]: any = useAddProductUserForOperationMutation?.();

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
  }: { [key: string]: any } = useGetSingleProductUserDetailForOperationQuery(
    getSingleUserApiParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!userId,
    },
  );

  const roleApiQueryParams: RoleApiQueryParamsI = {
    productId,
    organizationId,
    organizationCompanyAccountId,
    limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
  };

  const methods = useForm<any>({
    defaultValues: upsertUserDefaultValues(),
    resolver: yupResolver(upsertUserValidationSchema),
  });
  const { handleSubmit, reset } = methods;

  const submitButtonHandler = () => {
    if (isPortalOpen?.isView) {
      setIsPortalOpen?.({
        isEdit: true,
        isUpsert: true,
        isOpen: true,
      });
      return;
    }
    handleSubmit(submitUpsertUser)();
  };

  const submitUpsertUser = async (formData: UpsertUserFormI) => {
    if (isPortalOpen?.isView) {
      setIsPortalOpen?.({
        isEdit: true,
        isUpsert: true,
        isOpen: true,
      });
      return;
    }
    const body = {
      ...formData,
      role: formData?.role?._id,
      team: formData?.team?._id,
      language: formData?.language?._id,
    };

    const apiDataParameter = { body };

    if (isPortalOpen?.isEdit) {
      submitUpdateUpsertUser(body);
      return;
    }

    try {
      await addProductUserForOperationTrigger?.(apiDataParameter)?.unwrap();
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

  const roleApiQuery = useLazyGetPermissionsRoleForUpsertOperationUserQuery?.();
  const teamApiQuery = useLazyGetTeamDropdownForOperationUserListQuery?.();

  const upsertUserFormFields = upsertUserFormFieldsDynamic?.(
    roleApiQuery,
    roleApiQueryParams,
    teamApiQuery,
  );

  const closeOperationUserForm = () => {
    reset?.();
    setIsPortalOpen?.({});
    setSelectedUserList?.([]);
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
  };
};
