import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  MultiCheckboxOptionI,
  ReportsI,
  UpsertServicesDashboardDefaultValueI,
} from './CreateDashboard.interface';
import { DropResult } from 'react-beautiful-dnd';
import {
  createDashboardDefaultValue,
  createDashboardValidationSchema,
  dashboardWidgetsData,
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
import { filteredEmptyValues } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { REPORT_TYPES } from '@/constants/strings';

export const useCreateDashboard = () => {
  const router = useRouter();
  const { dashboardId } = router?.query;
  const auth = useAuth();
  const { _id: productId } = auth?.product;
  const { action } = router?.query;

  const methods = useForm({
    defaultValues: createDashboardDefaultValue?.(),
    resolver: yupResolver(createDashboardValidationSchema?.()),
  });

  const { handleSubmit, watch, reset, setValue, control } = methods;

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
        })),
      );
  }, [specificUserWatch]);

  const submitCreateDashboardFilterForm = async (
    formData: UpsertServicesDashboardDefaultValueI,
  ) => {
    const filterFormData = filteredEmptyValues(formData);
    const body = {
      ...filterFormData,
      reports: reports?.map((item) => ({
        type: REPORT_TYPES?.STATIC,
        visibility: true,
        name: item,
      })),
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
    } catch (error: any) {}
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
    } catch (error: any) {}
  };

  const reports: ReportsI[] | string[] | undefined | MultiCheckboxOptionI[] =
    watch('reports');

  const alignArrays = (
    firstArray: MultiCheckboxOptionI[],
    secondArray: any[],
  ) => {
    const dragAndDropAlignment: string[] | [] | undefined = secondArray?.reduce(
      (acc: any, item: any) => {
        if (firstArray?.includes(item?.value)) {
          acc?.push(item?.value);
        }
        return acc;
      },
      [],
    );
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
      dashboardWidgetsData,
      source?.index,
      destination?.index,
    );
    const dragAndDropAlignment: string[] | [] | undefined = alignArrays(
      reports,
      newItems,
    );

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
    reports,
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
  };
};
