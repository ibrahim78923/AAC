import { useForm } from 'react-hook-form';
import {
  upsertUserDefaultValues,
  upsertUserFormFieldsDynamic,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import {
  useAddProductUserForLoyaltyMutation,
  useGetSingleProductUserDetailForLoyaltyQuery,
  useLazyGetPermissionsRoleForUpsertUserQuery,
  useUpdateProductUserForLoyaltyMutation,
} from '@/services/airLoyaltyProgram/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect } from 'react';
import { PAGINATION } from '@/config';
import { ARRAY_INDEX } from '@/constants/strings';

export const useUpsertUser = (props: any) => {
  const { setIsPortalOpen, isPortalOpen, userId, setSelectedUserList } = props;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const [
    updateProductUserForLoyaltyTrigger,
    updateProductUserForLoyaltyStatus,
  ]: any = useUpdateProductUserForLoyaltyMutation?.();

  const [addProductUserForLoyaltyTrigger, addProductUserForLoyaltyStatus]: any =
    useAddProductUserForLoyaltyMutation?.();

  const getSingleUserApiParameter = {
    pathParams: {
      id: userId,
    },
  };
  const { data, isLoading, isFetching }: any =
    useGetSingleProductUserDetailForLoyaltyQuery(getSingleUserApiParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!userId,
    });

  const roleApiQueryParams = {
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

  const submitUpsertUser = async (formData: any) => {
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
      language: formData?.language?._id,
    };

    const apiDataParameter = { body };

    if (isPortalOpen?.isEdit) {
      submitUpdateUpsertUser(body);
      return;
    }

    try {
      await addProductUserForLoyaltyTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('User added successfully');
      closeLoyaltyUserForm?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateUpsertUser = async (formData: any) => {
    delete formData?.email;
    const apiDataParameter = {
      body: formData,
      pathParams: {
        id: userId,
      },
    };
    try {
      await updateProductUserForLoyaltyTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('User added successfully');
      closeLoyaltyUserForm?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const roleApiQuery = useLazyGetPermissionsRoleForUpsertUserQuery?.();
  const upsertUserFormFields = upsertUserFormFieldsDynamic?.(
    roleApiQuery,
    roleApiQueryParams,
  );
  const closeLoyaltyUserForm = () => {
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
    addProductUserForLoyaltyStatus,
    updateProductUserForLoyaltyStatus,
    closeLoyaltyUserForm,
    submitButtonHandler,
    isLoading,
    isFetching,
  };
};
