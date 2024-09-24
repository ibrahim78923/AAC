import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  createDashboardDefaultValue,
  MANAGE_DASHBOARD_ACCESS_TYPES,
  validationSchema,
} from './CreateForm.data';
import {
  useGetSalesDashboardByIdQuery,
  useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery,
  usePostSalesDashboardMutation,
  useUpdateSalesDashboardMutation,
} from '@/services/airSales/dashboard';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import {
  DRAWER_TYPES,
  MANAGE_ACCESS_TYPES,
  NOTISTACK_VARIANTS,
} from '@/constants/strings';
import { getSession } from '@/utils';

const useCreateForm = (formType: any) => {
  const router = useRouter();
  const { user }: any = getSession();
  const currentUser = user?._id;
  const selectedDashboardId = router?.query?.id;
  const disbaleForm = formType === DRAWER_TYPES?.VIEW ? true : false;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

  // States
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [accessValue, setAccessValue] = useState('');

  // API calls
  const [postSalesDashboard, { isLoading: postSalesDashboardLoading }] =
    usePostSalesDashboardMutation();

  const { data: getSalesDashboardById, isLoading: dashboardDetailsLoading } =
    useGetSalesDashboardByIdQuery(selectedDashboardId, {
      skip: !selectedDashboardId,
    });

  const disableAccess =
    currentUser === getSalesDashboardById?.data?.createdBy ||
    formType === DRAWER_TYPES?.ADD
      ? false
      : true;

  const [updatesalesDashboard, { isLoading: loadingUpdateDashboard }] =
    useUpdateSalesDashboardMutation();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: createDashboardDefaultValue?.(),
  });

  const { handleSubmit, reset, control, setValue, watch }: any = methods;

  useEffect(() => {
    if (selectedDashboardId) {
      const data = getSalesDashboardById?.data;
      const fieldsToSet: any = {
        dashboardName: data?.name,
        access: data?.access,
        isDefault: data?.isDefault,
        permissions: data?.permissions,
        specialUsers: data?.specialUsers?.map((item: any) => item),
        permissionsUsers: data?.specialUsers?.map(
          (item: any) => item?.permission,
        ),
        reportType: data?.reports?.map((item: any) => item?.name),
      };
      for (const key in fieldsToSet) {
        setValue(key, fieldsToSet[key]);
      }
    }
  }, [selectedDashboardId, setValue, getSalesDashboardById]);

  // Functions
  const selectedReports = watch('reportType');

  const dashboardPermissions = (radioVal: any, nestedVal?: any) => {
    switch (radioVal) {
      case MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER:
        return MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL;
      case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE:
        switch (nestedVal) {
          case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_ONLY_VIEW:
            return MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL;
          case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW:
            return MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL;
          default:
            return MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL;
        }
      case MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS:
        switch (nestedVal) {
          case MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_ONLY_VIEW:
            return MANAGE_ACCESS_TYPES?.VIEW_ONLY_CAPITAL;
          case MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_EDIT_AND_VIEW:
            return MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL;
          default:
            return MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL;
        }
      default:
        return MANAGE_ACCESS_TYPES?.VIEW_AND_EDIT_CAPITAL;
    }
  };

  const specificUserWatch: any = useWatch({
    control,
    name: 'specialUsers',
    defaultValue: [],
  });

  useEffect(() => {
    if (!!specificUserWatch?.length)
      setValue(
        'permissionsUsers',
        specificUserWatch?.map((item: any) => ({
          name: `${item?.firstName} ${item?.lastName}`,
          userId: item?._id,
          permission: item?.permission,
        })),
      );
  }, [specificUserWatch]);

  const onSubmit = async (values: any) => {
    const payload: any = {
      name: values?.dashboardName,
      reports: values?.reportType?.map((item: any) => ({
        visibility: true,
        type: 'static',
        name: item,
      })),
      access: values?.access,
      permissions: dashboardPermissions(values?.access, values?.permissions),
      specialUsers: values?.permissionsUsers?.map((user: any) => {
        return {
          userId: user?.userId,
          permission: user?.permission,
        };
      }),
      isDefault: values?.isDefault,
    };
    try {
      if (formType === DRAWER_TYPES?.EDIT) {
        await updatesalesDashboard({
          body: { id: selectedDashboardId, ...payload },
        })?.unwrap();
      } else {
        await postSalesDashboard({
          body: payload,
        })?.unwrap();
      }
      reset();
      router?.back();
      enqueueSnackbar(
        `Dashboard ${
          formType === DRAWER_TYPES?.EDIT ? 'Updated' : 'Created'
        } Successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const { fields } = useFieldArray<any>({
    control,
    name: 'permissionsUsers',
  });

  const apiQueryUsers =
    useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery?.();

  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
  };

  return {
    MANAGE_DASHBOARD_ACCESS_TYPES,
    postSalesDashboardLoading,
    dashboardDetailsLoading,
    handleChangeAccessValue,
    loadingUpdateDashboard,
    dashboardPermissions,
    specificUserWatch,
    setIsOpenPreview,
    selectedReports,
    setAccessValue,
    isOpenPreview,
    apiQueryUsers,
    disableAccess,
    handleSubmit,
    accessValue,
    disbaleForm,
    currentUser,
    productId,
    setValue,
    onSubmit,
    methods,
    control,
    fields,
    router,
    reset,
    watch,
  };
};
export default useCreateForm;
