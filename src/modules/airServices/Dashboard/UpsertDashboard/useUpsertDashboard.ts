import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  MultiCheckboxOptionI,
  UpsertServicesDashboardDefaultValueI,
} from './UpsertDashboard.interface';
import { DropResult } from 'react-beautiful-dnd';
import {
  createDashboardDefaultValue,
  createDashboardValidationSchema,
  dashboardWidgetsData,
  MANAGE_DASHBOARD_ACCESS_TYPES,
  upsertServiceDashboardFormFieldsDynamic,
} from './UpsertDashboard.data';
import { useRouter } from 'next/router';
import {
  useAddSingleServicesDashboardMutation,
  useGetSingleServicesDashboardQuery,
  useLazyGetDashboardUserAccessListDropdownListForDashboardQuery,
  useUpdateSingleServicesDashboardMutation,
} from '@/services/airServices/dashboard';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { REPORT_TYPES } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';

export const useUpsertDashboard = () => {
  const router = useRouter();
  const { dashboardId } = router?.query;
  const { action } = router?.query;
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const methods = useForm<any>({
    defaultValues: createDashboardDefaultValue?.(),
    resolver: yupResolver(createDashboardValidationSchema?.()),
  });

  const { handleSubmit, reset, setValue, control, getValues } = methods;

  const { fields } = useFieldArray<any>({
    control,
    name: 'permissionsUsers',
  });

  const getSingleTicketParameter = {
    queryParams: {
      dashboardId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetSingleServicesDashboardQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!dashboardId,
    });

  const [addSingleServicesDashboardTrigger, addSingleServicesDashboardStatus] =
    useAddSingleServicesDashboardMutation();

  const [
    updateSingleServicesDashboardTrigger,
    updateSingleServicesDashboardStatus,
  ] = useUpdateSingleServicesDashboardMutation();

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
    const filterFormData = filteredEmptyValues(formData);
    const body = {
      ...filterFormData,
      permissions:
        filterFormData?.access ===
        MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER
          ? MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW
          : filterFormData?.permissions,
      reports: formData?.reports?.map((item: any) => ({
        type: REPORT_TYPES?.STATIC,
        visibility: true,
        name: item,
      })),
      specialUsers:
        filterFormData?.access ===
        MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS
          ? formData?.permissionsUsers?.map((user: any) => ({
              userId: user?.userId,
              permission: user?.permission,
            }))
          : [{}],
    };

    delete body?.everyoneAccess;
    delete body?.permissionsUsers;
    delete body?.dashboardWidgets;

    if (!!dashboardId) {
      submitUpdateDashboardFilterForm(body);
      return;
    }

    const apiDataParameter = {
      body,
    };

    try {
      await addSingleServicesDashboardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Dashboard created successfully!');
      router?.push(AIR_SERVICES?.MANAGE_DASHBOARD);
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
      router?.push(AIR_SERVICES?.MANAGE_DASHBOARD);
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

  const apiQueryUsers =
    useLazyGetDashboardUserAccessListDropdownListForDashboardQuery?.();

  const upsertServiceDashboardFormFields =
    upsertServiceDashboardFormFieldsDynamic?.(apiQueryUsers, fields);

  useEffect(() => {
    reset(() => createDashboardDefaultValue(data?.data?.dashboard));
  }, [data, reset]);

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
  };
};
