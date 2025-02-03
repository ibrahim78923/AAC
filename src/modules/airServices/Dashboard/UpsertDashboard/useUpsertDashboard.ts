import { useEffect, useMemo } from 'react';
import { UpsertServicesDashboardDefaultValueI } from './UpsertDashboard.interface';
import {
  createDashboardDefaultValue,
  createDashboardValidationSchema,
  upsertServiceDashboardFormFieldsDynamic,
} from './UpsertDashboard.data';
import { useRouter } from 'next/router';
import { filteredEmptyValues } from '@/utils/api';
import { REPORT_TYPES } from '@/constants/strings';
import {
  MANAGE_DASHBOARD_ACCESS_TYPES,
  SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT,
} from '../Dashboard.data';
import {
  useAddServicesDashboardSingleDashboardMutation,
  useGetServicesDashboardSingleDashboardDetailsQuery,
  useUpdateServicesDashboardSingleDashboardMutation,
} from '@/services/airServices/dashboard';
import { fullName } from '@/utils/avatarUtils';
import { setIsPortalOpen } from '@/redux/slices/airServices/dashboard/slice';
import { useAppDispatch } from '@/redux/store';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';
import { getSession } from '@/utils';

const { PRIVATE_TO_OWNER, EVERYONE_EDIT_AND_VIEW, SPECIFIC_USER_AND_TEAMS } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

export const useUpsertDashboard = () => {
  const router = useRouter();
  const dashboardId = router?.query?.dashboardId;
  const action = router?.query?.action;
  const dispatch = useAppDispatch();

  const authUserId = useMemo(() => {
    const userId = getSession() as any;
    return userId?.user?._id;
  }, []);

  const formLibProps = {
    validationSchema: createDashboardValidationSchema?.(),
    defaultValues: createDashboardDefaultValue?.(),
  };

  const { handleSubmit, reset, setValue, getValues, methods, watch } =
    useFormLib(formLibProps);

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

  const singleDashboardData = data?.data?.dashboard;
  const disabledEditDashboard =
    !!dashboardId && singleDashboardData?.createdBy !== authUserId;

  const [addSingleServicesDashboardTrigger, addSingleServicesDashboardStatus] =
    useAddServicesDashboardSingleDashboardMutation();

  const [
    updateSingleServicesDashboardTrigger,
    updateSingleServicesDashboardStatus,
  ] = useUpdateServicesDashboardSingleDashboardMutation();

  const specificUserWatch = watch('specialUsers');

  const dashboardWidgetsWatch = watch('dashboardWidgets');

  const reportsWatch = watch('reports');

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
          : [],
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
    upsertServiceDashboardFormFieldsDynamic?.(disabledEditDashboard);

  useEffect(() => {
    reset(() => createDashboardDefaultValue(singleDashboardData));
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

  const showLoader = isLoading || isFetching;

  return {
    methods,
    submitCreateDashboardFilterForm,
    reportsWatch,
    action,
    handleSubmit,
    upsertServiceDashboardFormFields,
    isError,
    dashboardWidgetsWatch,
    refetch,
    apiCallInProgress,
    goToManageDashboard,
    setValue,
    openPreviewDashboard,
    showLoader,
  };
};
