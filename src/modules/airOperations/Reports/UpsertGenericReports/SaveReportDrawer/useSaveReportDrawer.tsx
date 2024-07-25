import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  reportsDataArray,
  reportsDefaultValues,
  reportsValidationSchema,
} from './SaveReportDrawer.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';
import {
  CHARTS,
  REPORT_TYPE,
  FIELD_TYPE,
  GENERIC_REPORT_MODULES,
} from '@/constants/strings';
import {
  SaveReportI,
  usersDropdownOptionsI,
} from './SaveReportDrawer.interface';
import {
  useLazyUsersDropdownQuery,
  useLazyMarketingDashboardDropdownQuery,
  useLazySalesDashboardDropdownQuery,
  useLazyServiceDashboardDropdownQuery,
  usePostGenericReportsMutation,
  usePatchGenericReportsMutation,
} from '@/services/airOperations/reports/upsert-generic-reports';

export const useSaveReportDrawer = (props: any) => {
  const {
    form,
    setOpen,
    reportId,
    setForm,
    metricType,
    selectedModule,
    singleReport,
    handleMoveBack,
  } = props;
  const [reportValidation, setReportValidation] = useState<any>({
    selectSharedWith: '',
    selectAddToDashboard: '',
  });

  const saveReportsMethods = useForm({
    resolver: yupResolver<any>(reportsValidationSchema(reportValidation)),
    defaultValues: reportsDefaultValues(singleReport),
  });

  const { watch, handleSubmit, reset, setValue, control, getValues } =
    saveReportsMethods;

  const ADD_TO = {
    ADD_TO_NEW_CONDITION_TWO: 'addToNewConditionTwo',
    ADD_TO_DASHBOARD: 'addToDashboard',
    SHARED_WITH: 'sharedWith',
    SPECIFIC_USERS_CONDITION_ONE: 'specificUsersConditionOne',
    NEW_DASHBOARD_SPECIFIC_USERS_CONDITION_ONE:
      'newDashboardSpecificUsersConditionOne',
  };

  const selectSharedWith = watch(ADD_TO?.SHARED_WITH);
  const selectAddToDashboard = watch(ADD_TO?.ADD_TO_DASHBOARD);
  const selectAddToNewDashboard = watch(ADD_TO?.ADD_TO_NEW_CONDITION_TWO);
  const sharedWithSpecificUser = watch(ADD_TO?.SPECIFIC_USERS_CONDITION_ONE);
  const newDashboardSpecificUser = watch(
    ADD_TO?.NEW_DASHBOARD_SPECIFIC_USERS_CONDITION_ONE,
  );
  const sharedWithSpecificUserWatch = watch(
    REPORT_TYPE?.SHARED_WITH_PERMISSIONS,
  );
  const newDashboardSpecificUserWatch = watch(
    REPORT_TYPE?.NEW_DASHBOARD_PERMISSIONS,
  );

  useEffect(() => {
    setReportValidation({
      selectSharedWith,
      selectAddToDashboard,
      selectAddToNewDashboard,
    });
    if (
      selectAddToDashboard === REPORT_TYPE?.ADD_TO_EXISTING ||
      selectAddToDashboard === REPORT_TYPE?.DO_NOT_ADD
    ) {
      setValue(ADD_TO?.ADD_TO_NEW_CONDITION_TWO, null);
    }
  }, [selectSharedWith, selectAddToDashboard, selectAddToNewDashboard]);

  const serviceDropdown = useLazyServiceDashboardDropdownQuery();
  const salesDropdown = useLazySalesDashboardDropdownQuery();
  const marketingDropdown = useLazyMarketingDashboardDropdownQuery();

  const getDashboardDropdown = () => {
    switch (selectedModule) {
      case GENERIC_REPORT_MODULES?.SERVICES:
        return serviceDropdown;
      case GENERIC_REPORT_MODULES?.SALES:
        return salesDropdown;
      case GENERIC_REPORT_MODULES?.MARKETING:
        return marketingDropdown;
      default:
        return [];
    }
  };
  const { fields: sharedWithFields } = useFieldArray<any>({
    control,
    name: REPORT_TYPE?.SHARED_WITH_PERMISSIONS,
  });

  const { fields: newDashboardFields } = useFieldArray<any>({
    control,
    name: REPORT_TYPE?.NEW_DASHBOARD_PERMISSIONS,
  });

  const setSharedWithPermissions = () => {
    const permissionUser = getValues(REPORT_TYPE?.SHARED_WITH_PERMISSIONS);

    const userMap = new Map(
      sharedWithSpecificUser?.map((item: any) => [item?._id, item]),
    );

    const validUserIds = new Set(
      sharedWithSpecificUser?.map((item: any) => item?._id),
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

    const newEntries = sharedWithSpecificUser
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
    setValue(REPORT_TYPE?.SHARED_WITH_PERMISSIONS, finalResult);
  };

  const setNewDashboardPermissions = () => {
    const permissionUser = getValues(REPORT_TYPE?.NEW_DASHBOARD_PERMISSIONS);

    const userMap = new Map(
      newDashboardSpecificUser?.map((item: any) => [item?._id, item]),
    );

    const validUserIds = new Set(
      newDashboardSpecificUser?.map((item: any) => item?._id),
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

    const newEntries = newDashboardSpecificUser
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
    setValue(REPORT_TYPE?.NEW_DASHBOARD_PERMISSIONS, finalResult);
  };

  useEffect(() => {
    setSharedWithPermissions();
  }, [sharedWithSpecificUser]);
  useEffect(() => {
    setNewDashboardPermissions();
  }, [newDashboardSpecificUser]);

  const dashboardDropdown = getDashboardDropdown();
  const usersDropdown = useLazyUsersDropdownQuery();
  const reportsArray = reportsDataArray(
    usersDropdown,
    dashboardDropdown,
    newDashboardFields,
    sharedWithFields,
  );
  const [postGenericReportTrigger, postGenericReportStatus] =
    usePostGenericReportsMutation();
  const [patchGenericReportTrigger, patchGenericReportStatus] =
    usePatchGenericReportsMutation();

  const onSubmit = async (data: SaveReportI) => {
    const existingDashboardIds = data?.addToExistingCondition?.map(
      (item: any) => item?._id,
    );
    const params = {
      id: reportId,
      payload: {
        module: metricType,
        widgets: form?.map((item: any) => {
          return {
            type: item?.templateType ? item?.templateType : item?.type,
            title: item.title,
            ...((item?.type === CHARTS?.BAR_CHART ||
              item?.type === CHARTS?.HORIZONTAL_BAR_CHART) && {
              barChart: {
                xAxis: {
                  fieldType: item?.xAxis?.ref
                    ? FIELD_TYPE?.OBJECT_ID
                    : FIELD_TYPE?.STATIC,
                  fieldName: item?.xAxis?.value,
                  ...(item?.xAxis?.ref && {
                    collectionName: item?.xAxis?.ref,
                  }),
                  ...(item?.xAxis?.ref && {
                    selectedIds: item?.xAxisType,
                  }),
                },
                yAxis: {
                  fieldName: REPORT_TYPE?.NO_OF_RECORDS,
                },
              },
            }),
            ...((item?.type === CHARTS?.PIE_CHART ||
              item?.type === CHARTS?.DONUT_CHART) && {
              genericChart: {
                fieldType: item?.xAxis?.ref
                  ? FIELD_TYPE?.OBJECT_ID
                  : FIELD_TYPE?.STATIC,
                fieldName: item?.xAxis?.value,
                ...(item?.xAxis?.ref && {
                  collectionName: item?.xAxis?.ref,
                }),
                ...(item?.xAxis?.ref && {
                  selectedIds: item?.xAxisType,
                }),
              },
            }),
            ...(item?.type === REPORT_TYPE?.TEXT && {
              text: {
                description: item?.component,
              },
            }),
            ...(item?.type === REPORT_TYPE?.TABLE && {
              table: {
                fields: item?.columnObject,
              },
            }),
            ...(item?.reportType === REPORT_TYPE?.COUNTER && {
              templateText: {
                fieldType: FIELD_TYPE?.STATIC,
                fieldName: item?.title,
              },
            }),
            isDateFilter: item?.subFilter ?? false,
          };
        }),
        name: data?.reportName,
        accessLevel: {
          type: data?.sharedWith,
          ...(data?.sharedWith === REPORT_TYPE?.EVERYONE && {
            access: data?.everyoneCondition,
          }),
          ...(data?.sharedWith === REPORT_TYPE?.SPECIFIC_USERS && {
            users: sharedWithSpecificUserWatch?.map(
              (item: usersDropdownOptionsI) => ({
                id: item?.userId,
                access: item?.permission,
              }),
            ),
          }),
        },
        isDateFilter: data?.addFilter,
        linkDashboard: {
          action: data?.addToDashboard,
          ...(data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW && {
            name: data?.addToNewConditionOne,
          }),
          ...(data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW && {
            access: data?.addToNewConditionTwo,
          }),
          ...(data?.addToNewConditionTwo === REPORT_TYPE?.SPECIFIC_USERS && {
            specialUsers: newDashboardSpecificUserWatch?.map(
              (item: usersDropdownOptionsI) => ({
                userId: item?.userId,
                permission: item?.permission,
              }),
            ),
          }),
          ...(data?.addToNewConditionTwo === REPORT_TYPE?.EVERYONE && {
            permissions: data?.newDashboardEveryoneCondition,
          }),
          ...(data?.addToDashboard === REPORT_TYPE?.ADD_TO_EXISTING && {
            existingDashboards: existingDashboardIds,
          }),
        },
      },
    };
    if (reportId) {
      try {
        await patchGenericReportTrigger(params)?.unwrap();
        successSnackbar('Report Edit Successfully');
        setForm([]);
        handleCancel();
        handleMoveBack();
      } catch (err: any) {
        errorSnackbar(err?.message ?? 'Error in Edit report');
      }
    } else {
      try {
        await postGenericReportTrigger(params)?.unwrap();
        successSnackbar('Report Created Successfully');
        setForm([]);
        handleCancel();
        handleMoveBack();
      } catch (err: any) {
        errorSnackbar(err?.message ?? 'Error in saving report');
      }
    }
  };
  const handleCancel = () => {
    reset();
    setOpen(false);
  };
  return {
    saveReportsMethods,
    watch,
    handleSubmit,
    onSubmit,
    handleCancel,
    selectAddToNewDashboard,
    reportsArray,
    postGenericReportStatus,
    patchGenericReportStatus,
  };
};
