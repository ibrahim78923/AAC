import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  MultiCheckboxOptionI,
  UpsertServicesDashboardDefaultValueI,
} from './CreateDashboard.interface';
import { DropResult } from 'react-beautiful-dnd';
import {
  createDashboardDefaultValue,
  createDashboardValidationSchema,
  dashboardWidgetsData,
  MANAGE_DASHBOARD_ACCESS_TYPES,
  upsertServiceDashboardFormFieldsDynamic,
} from './CreateDashboard.data';
import { useRouter } from 'next/router';
import {
  useAddSingleServicesDashboardMutation,
  useGetSingleServicesDashboardQuery,
  useLazyGetDashboardUserAccessListDropdownListForDashboardQuery,
  useUpdateSingleServicesDashboardMutation,
} from '@/services/airServices/dashboard';
import useAuth from '@/hooks/useAuth';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { REPORT_TYPES } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';

export const useCreateDashboard = () => {
  const router = useRouter();
  const { dashboardId } = router?.query;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product;
  const { action } = router?.query;
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const methods = useForm<any>({
    defaultValues: createDashboardDefaultValue?.(),
    resolver: yupResolver(createDashboardValidationSchema?.()),
  });

  const { handleSubmit, reset, setValue, control } = methods;

  const { fields } = useFieldArray<any>({
    control,
    name: 'permissionsUsers',
  });

  const getSingleTicketParameter = {
    queryParams: {
      dashboardId,
    },
  };

  const { data, isLoading, isFetching, isError } =
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

  useEffect(() => {
    if (!!specificUserWatch?.length)
      setValue(
        'permissionsUsers',
        specificUserWatch?.map((item: any) => ({
          name: `${item?.firstName} ${item?.lastName}`,
          userId: item?._id,
        })),
      );
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
          : [],
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
    upsertServiceDashboardFormFieldsDynamic?.(apiQueryUsers, productId, fields);

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
  };
};
