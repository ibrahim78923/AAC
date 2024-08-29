import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  createDashboardDefaultValue,
  validationSchema,
} from './CreateForm.data';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '@/modules/airServices/Dashboard/CreateDashboard/CreateDashboard.data';
import {
  useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery,
  usePostSalesDashboardMutation,
} from '@/services/airSales/dashboard';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCreateForm = () => {
  const router = useRouter();
  // const selectedDashboardId = router?.query?.id;

  // States
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [accessValue, setAccessValue] = useState('');

  // commented for future use
  // const { data: getSalesDashboardById } = useGetSalesDashboardByIdQuery(selectedDashboardId,
  //   { skip: !selectedDashboardId });

  // Functions

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: createDashboardDefaultValue?.(),
  });
  const { handleSubmit, reset, control, setValue, watch }: any = methods;

  const selectedReports = watch('reportType');

  const dashboardPermissions = (radioVal: any) => {
    switch (radioVal) {
      case MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER:
        return 'VIEW_AND_EDIT';
      case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_ONLY_VIEW:
        return 'VIEW_ONLY';
      case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW:
        return 'VIEW_AND_EDIT';
      case MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS:
      default:
        return 'VIEW_AND_EDIT';
    }
  };

  const [postSalesDashboard, { isLoading: postSalesDashboardLoading }] =
    usePostSalesDashboardMutation();

  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

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
      permissions: dashboardPermissions(values?.access),
      specialUsers: values?.permissionsUsers.map((user: any) => {
        return {
          userId: user?.userId,
          permission: user?.permission,
        };
      }),
      isDefault: values?.isDefault,
    };

    try {
      await postSalesDashboard({
        body: payload,
      }).unwrap();
      reset();
      router.back();
      enqueueSnackbar('Dashboard Created Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
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
    dashboardPermissions,
    selectedReports,
    methods,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    handleChangeAccessValue,
    setIsOpenPreview,
    setAccessValue,
    isOpenPreview,
    accessValue,
    router,
    postSalesDashboardLoading,
    onSubmit,
    productId,
    apiQueryUsers,
    specificUserWatch,
    fields,
  };
};
export default useCreateForm;
