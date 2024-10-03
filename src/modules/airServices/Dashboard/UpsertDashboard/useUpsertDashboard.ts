import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  MultiCheckboxOptionI,
  UpsertServicesDashboardDefaultValueI,
} from './UpsertDashboard.interface';
import { DropResult } from 'react-beautiful-dnd';
import {
  createDashboardDefaultValue,
  createDashboardValidationSchema,
  dashboardWidgetsData,
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
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../Dashboard.data';
import {
  useAddServicesDashboardSingleDashboardMutation,
  useGetServicesDashboardSingleDashboardDetailsQuery,
  useUpdateServicesDashboardSingleDashboardMutation,
} from '@/services/airServices/dashboard';

const { PRIVATE_TO_OWNER, EVERYONE_EDIT_AND_VIEW, SPECIFIC_USER_AND_TEAMS } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

export const useUpsertDashboard = () => {
  const router = useRouter();
  const dashboardId = router?.query?.dashboardId;
  const action = router?.query?.action;
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

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
            name: `${mappedUser?.firstName} ${mappedUser?.lastName}`,
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
        name: `${item?.firstName} ${item?.lastName}`,
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

  const reportsWatch = useWatch({
    control,
    name: 'reports',
    defaultValue: [],
  });

  const alignArrays = (
    firstArray: MultiCheckboxOptionI[],
    secondArray: any[],
  ) => {
    const dragAndDropAlignment = secondArray?.reduce((acc: any, item: any) => {
      if (firstArray?.includes(item?.value)) {
        acc?.push(item?.value);
      }
      return acc;
    }, []);
    return dragAndDropAlignment;
  };

  const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array?.from(list);
    const [removed] = result?.splice(startIndex, 1);
    result?.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(
      dashboardWidgetsWatch,
      source?.index,
      destination?.index,
    );
    const dragAndDropAlignment = alignArrays(reportsWatch, newItems);
    setValue('reports', dragAndDropAlignment);
    setValue('dashboardWidgets', newItems);
  };

  const upsertServiceDashboardFormFields =
    upsertServiceDashboardFormFieldsDynamic?.();

  useEffect(() => {
    reset(() => createDashboardDefaultValue(data?.data?.dashboard));
  }, [data, reset]);

  const apiCallInProgress =
    addSingleServicesDashboardStatus?.isLoading ||
    updateSingleServicesDashboardStatus?.isLoading;

  return {
    methods,
    submitCreateDashboardFilterForm,
    reportsWatch,
    onDragEnd,
    action,
    router,
    handleSubmit,
    upsertServiceDashboardFormFields,
    addSingleServicesDashboardStatus,
    updateSingleServicesDashboardStatus,
    isLoading,
    isFetching,
    isError,
    dashboardWidgetsWatch,
    isPortalOpen,
    setIsPortalOpen,
    refetch,
    apiCallInProgress,
    goToManageDashboard,
  };
};
