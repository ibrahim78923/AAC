import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { UpsertServicesDashboardDefaultValueI } from './UpsertDashboard.interface';
import {
  createDashboardDefaultValue,
  createDashboardValidationSchema,
  upsertServiceDashboardFormFieldsDynamic,
} from './UpsertDashboard.data';
import { useRouter } from 'next/router';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { REPORT_TYPES } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import {
  MANAGE_DASHBOARD_ACCESS_TYPES,
  SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT,
  dashboardWidgetsData,
} from '../Dashboard.data';
import {
  useAddServicesDashboardSingleDashboardMutation,
  useGetServicesDashboardSingleDashboardDetailsQuery,
  useUpdateServicesDashboardSingleDashboardMutation,
} from '@/services/airServices/dashboard';
import { fullName } from '@/utils/avatarUtils';
import { setIsPortalOpen } from '@/redux/slices/airServices/dashboard/slice';
import { useAppDispatch } from '@/redux/store';

const { PRIVATE_TO_OWNER, EVERYONE_EDIT_AND_VIEW, SPECIFIC_USER_AND_TEAMS } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

export const useUpsertDashboard = () => {
  const router = useRouter();
  const dashboardId = router?.query?.dashboardId;
  const action = router?.query?.action;
  const dispatch = useAppDispatch();
  const methods = useForm<any>({
    defaultValues: createDashboardDefaultValue?.(),
    resolver: yupResolver(createDashboardValidationSchema?.()),
  });

  const { handleSubmit, reset, setValue, control, getValues } = methods;

  const getSingleTicketParameter = {
    queryParams: {
      dashboardId,
    },
  };

  const goToManageDashboard = () =>
    router?.push(AIR_SERVICES?.MANAGE_DASHBOARD);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesDashboardSingleDashboardDetailsQuery(
      getSingleTicketParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!dashboardId,
      },
    );

  const [addSingleServicesDashboardTrigger, addSingleServicesDashboardStatus] =
    useAddServicesDashboardSingleDashboardMutation();

  const [
    updateSingleServicesDashboardTrigger,
    updateSingleServicesDashboardStatus,
  ] = useUpdateServicesDashboardSingleDashboardMutation();

  const specificUserWatch = useWatch({
    control,
    name: 'specialUsers',
    defaultValue: [],
  });

  const dashboardWidgetsWatch = useWatch({
    control,
    name: 'dashboardWidgets',
    defaultValue: dashboardWidgetsData,
  });

  const reportsWatch = useWatch({
    control,
    name: 'reports',
    defaultValue: [],
  });

  const setPermissions = () => {
    const permissionUser = getValues('permissionsUsers');

    const userMap = new Map(
      specificUserWatch?.map((item: any) => [item?._id, item]),
    );

    const validUserIds = new Set(
      specificUserWatch?.map((item: any) => item?._id),
    );

    const updatedPermissionUser = permissionUser
      ?.filter((item: any) => validUserIds?.has(item?.userId))
      ?.map((item: any) => {
        const mappedUser: any = userMap?.get(item?.userId);
        if (mappedUser) {
          return {
            ...item,
            ...mappedUser,
            name: fullName(mappedUser?.firstName, mappedUser?.lastName),
            permission: item?.permission ?? '',
          };
        }
        return item;
      });

    const newEntries = specificUserWatch
      ?.filter(
        (item: any) =>
          !permissionUser?.some(
            (existingItem: any) => existingItem?.userId === item?._id,
          ),
      )
      ?.map((item: any) => ({
        ...item,
        name: fullName(item?.firstName, item?.lastName),
        userId: item?._id,
        permission: item?.permission ?? '',
      }));

    const finalResult = [...updatedPermissionUser, ...newEntries];
    setValue('permissionsUsers', finalResult);
  };

  useEffect(() => {
    setPermissions();
  }, [specificUserWatch]);

  const submitCreateDashboardFilterForm = async (
    formData: UpsertServicesDashboardDefaultValueI,
  ) => {
    const body = {
      name: formData?.name,
      isDefault: formData?.isDefault,
      access: formData?.access,
      permissions:
        formData?.access === PRIVATE_TO_OWNER
          ? EVERYONE_EDIT_AND_VIEW
          : formData?.permissions,
      reports: formData?.reports?.map((item: any) => ({
        type: REPORT_TYPES?.STATIC,
        visibility: true,
        name: item,
      })),
      specialUsers:
        formData?.access === SPECIFIC_USER_AND_TEAMS
          ? formData?.permissionsUsers?.map((user: any) => ({
              userId: user?.userId,
              permission: user?.permission,
            }))
          : [{}],
    };

    const filterFormData = filteredEmptyValues(body);

    if (!!dashboardId) {
      submitUpdateDashboardFilterForm(filterFormData);
      return;
    }

    const apiDataParameter = {
      body: filterFormData,
    };

    try {
      await addSingleServicesDashboardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Dashboard created successfully!');
      goToManageDashboard?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateDashboardFilterForm = async (
    formData: UpsertServicesDashboardDefaultValueI,
  ) => {
    const body = {
      id: dashboardId,
      ...formData,
    };

    const apiDataParameter = {
      body,
    };

    try {
      await updateSingleServicesDashboardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Dashboard updated successfully!');
      goToManageDashboard?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const upsertServiceDashboardFormFields =
    upsertServiceDashboardFormFieldsDynamic?.();

  useEffect(() => {
    reset(() => createDashboardDefaultValue(data?.data?.dashboard));
  }, [data, reset]);

  const apiCallInProgress =
    addSingleServicesDashboardStatus?.isLoading ||
    updateSingleServicesDashboardStatus?.isLoading;

  const openPreviewDashboard = () => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.PREVIEW_DASHBOARD,
        data: reportsWatch,
      }),
    );
  };

  return {
    methods,
    submitCreateDashboardFilterForm,
    reportsWatch,
    action,
    handleSubmit,
    upsertServiceDashboardFormFields,
    isLoading,
    isFetching,
    isError,
    dashboardWidgetsWatch,
    refetch,
    apiCallInProgress,
    goToManageDashboard,
    setValue,
    openPreviewDashboard,
  };
};
