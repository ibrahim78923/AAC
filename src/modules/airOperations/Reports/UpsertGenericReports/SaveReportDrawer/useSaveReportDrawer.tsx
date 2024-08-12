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
  SELECTED_ARRAY_LENGTH,
  ADD_TO,
} from '@/constants/strings';
import {
  SaveReportDrawerI,
  SaveReportI,
  UsersDropdownOptionsI,
} from './SaveReportDrawer.interface';
import {
  useLazyUsersDropdownQuery,
  useLazyDashboardDropdownQuery,
  usePostGenericReportsMutation,
  usePatchGenericReportsMutation,
} from '@/services/airOperations/reports/upsert-generic-reports';

export const useSaveReportDrawer = (props: SaveReportDrawerI) => {
  const { form, setOpen, reportId, metricType, data, handleMoveBack } = props;
  const [reportValidation, setReportValidation] = useState<any>({
    selectSharedWith: null,
    selectAddToDashboard: null,
    selectAddToNewDashboard: null,
  });
  const singleReport = (data as any)?.data;
  const saveReportsMethods = useForm({
    resolver: yupResolver<any>(reportsValidationSchema(reportValidation)),
    defaultValues: reportsDefaultValues(singleReport),
  });
  const dashboardDropdown = useLazyDashboardDropdownQuery();
  const usersDropdown = useLazyUsersDropdownQuery();
  const [postGenericReportTrigger, postGenericReportStatus] =
    usePostGenericReportsMutation();
  const [patchGenericReportTrigger, patchGenericReportStatus] =
    usePatchGenericReportsMutation();
  const allDashboardData =
    singleReport?.dasboardDetails[SELECTED_ARRAY_LENGTH?.ZERO];

  const allUsersData = singleReport?.genericReport?.accessLevel?.users;
  useEffect(() => {
    if (allUsersData) {
      const matchedUsersData = allUsersData?.map((user: any) => ({
        _id: user?._id,
        firstName: user?.userDetails?.firstName ?? null,
        lastName: user?.userDetails?.lastName ?? null,
        permission: user?.access,
      }));
      setValue(ADD_TO?.SPECIFIC_USERS_CONDITION_ONE, matchedUsersData ?? []);
    }
  }, [allUsersData]);
  useEffect(() => {
    if (
      allDashboardData?.dashboardDetails?.length === SELECTED_ARRAY_LENGTH?.ZERO
    ) {
      setValue(ADD_TO?.ADD_TO_DASHBOARD, REPORT_TYPE?.DO_NOT_ADD);
    } else {
      if (
        allDashboardData?.dashboardDetails[SELECTED_ARRAY_LENGTH?.ZERO]?.reports
          ?.action === REPORT_TYPE?.ADD_TO_NEW
      ) {
        setValue(ADD_TO?.ADD_TO_DASHBOARD, REPORT_TYPE?.ADD_TO_NEW);
        setValue(
          ADD_TO?.ADD_TO_NEW_CONDITION_ONE,
          allDashboardData?.dashboardDetails[SELECTED_ARRAY_LENGTH?.ZERO]?.name,
        );
        setValue(
          ADD_TO?.ADD_TO_NEW_CONDITION_TWO,
          allDashboardData?.dashboardDetails[SELECTED_ARRAY_LENGTH?.ZERO]
            ?.access,
        );
        setValue(
          ADD_TO?.NEW_DASHBOARD_EVERYONE_CONDITION,
          allDashboardData?.dashboardDetails[SELECTED_ARRAY_LENGTH?.ZERO]
            ?.permissions,
        );
        const dashboardUsersData = allDashboardData?.dashboardDetails[
          SELECTED_ARRAY_LENGTH?.ZERO
        ]?.specialUsers?.map((user: any) => ({
          _id: user?.userId,
          firstName: user?.name?.firstName ?? null,
          lastName: user?.name?.lastName ?? null,
          permission: user?.permission,
        }));
        setValue(
          ADD_TO?.NEW_DASHBOARD_SPECIFIC_USERS_CONDITION_ONE,
          dashboardUsersData ?? [],
        );
      } else if (
        allDashboardData?.dashboardDetails[SELECTED_ARRAY_LENGTH?.ZERO]?.reports
          ?.action === REPORT_TYPE?.ADD_TO_EXISTING
      ) {
        setValue(ADD_TO?.ADD_TO_DASHBOARD, REPORT_TYPE?.ADD_TO_EXISTING);
        const existingDashboardData = allDashboardData?.dashboardDetails?.map(
          (dashboard: any) => ({
            _id: dashboard?._id,
            name: dashboard?.name,
          }),
        );
        setValue(ADD_TO?.ADD_TO_EXISTING_CONDITION, existingDashboardData);
      }
    }
  }, [allDashboardData]);
  const { watch, handleSubmit, reset, setValue, control, getValues } =
    saveReportsMethods;
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
  const reportsArray = reportsDataArray(
    usersDropdown,
    dashboardDropdown,
    newDashboardFields,
    sharedWithFields,
  );
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
              (item: UsersDropdownOptionsI) => ({
                id: item?.userId,
                access: item?.permission,
              }),
            ),
          }),
        },
        isDateFilter: data?.addFilter,
        linkDashboard: {
          action: data?.addToDashboard,
          // productId: '',
          ...(data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW && {
            name: data?.addToNewConditionOne,
          }),
          ...(data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW && {
            access: data?.addToNewConditionTwo,
          }),
          ...(data?.addToNewConditionTwo === REPORT_TYPE?.SPECIFIC_USERS && {
            specialUsers: newDashboardSpecificUserWatch?.map(
              (item: UsersDropdownOptionsI) => ({
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
        successSnackbar('Report Customize Successfully');
        handleMoveBack();
      } catch (err: any) {
        errorSnackbar(err?.message ?? 'Error in customize report');
      }
    } else {
      try {
        await postGenericReportTrigger(params)?.unwrap();
        successSnackbar('Report Created Successfully');
        handleMoveBack();
      } catch (err: any) {
        errorSnackbar(err?.message ?? 'Error in creating report');
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
