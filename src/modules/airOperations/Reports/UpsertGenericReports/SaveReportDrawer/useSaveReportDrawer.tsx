import { useFieldArray } from 'react-hook-form';
import {
  reportsDataArray,
  reportsDefaultValues,
  reportsValidationSchema,
} from './SaveReportDrawer.data';
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
  usePostGenericReportsMutation,
  usePatchGenericReportsMutation,
} from '@/services/airOperations/reports/upsert-generic-reports';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  BACKEND_COLLECTION_NAME,
  BACKEND_REPORT_ACCESS,
} from '@/constants/api';
import { useFormLib } from '@/hooks/useFormLib';

export const useSaveReportDrawer = (props: SaveReportDrawerI) => {
  const { form, reportId, metricType, data, handleMoveBack } = props;

  const router: any = useRouter();
  const { id } = router?.query;

  const [reportValidation, setReportValidation] = useState<any>({
    selectSharedWith: null,
    selectAddToDashboard: null,
    selectAddToNewDashboard: null,
  });

  const singleReport = (data as any)?.data;
  const [postGenericReportTrigger, postGenericReportStatus] =
    usePostGenericReportsMutation();
  const [patchGenericReportTrigger, patchGenericReportStatus] =
    usePatchGenericReportsMutation();
  const allDashboardData =
    singleReport?.dasboardDetails[SELECTED_ARRAY_LENGTH?.ZERO];
  const allUsersData = singleReport?.genericReport?.accessLevel?.users;

  const saveReportsMethodProps = {
    validationSchema: reportsValidationSchema(reportValidation),
    defaultValues: reportsDefaultValues(singleReport),
  };

  const { watch, handleSubmit, setValue, control, getValues, methods } =
    useFormLib(saveReportsMethodProps);

  const { fields: sharedWithFields } = useFieldArray<any>({
    control,
    name: ADD_TO?.SHARED_WITH_PERMISSIONS,
  });
  const { fields: newDashboardFields } = useFieldArray<any>({
    control,
    name: ADD_TO?.NEW_DASHBOARD_PERMISSIONS,
  });

  const reportsArray = reportsDataArray(newDashboardFields, sharedWithFields);

  const [
    selectSharedWith,
    selectAddToDashboard,
    selectAddToNewDashboard,
    sharedWithSpecificUser,
    newDashboardSpecificUser,
    sharedWithSpecificUserWatch,
    newDashboardSpecificUserWatch,
  ] = watch([
    ADD_TO?.SHARED_WITH,
    ADD_TO?.ADD_TO_DASHBOARD,
    ADD_TO?.ADD_TO_NEW_CONDITION_TWO,
    ADD_TO?.SPECIFIC_USERS_CONDITION_ONE,
    ADD_TO?.NEW_DASHBOARD_SPECIFIC_USERS_CONDITION_ONE,
    ADD_TO?.SHARED_WITH_PERMISSIONS,
    ADD_TO?.NEW_DASHBOARD_PERMISSIONS,
  ]);

  useEffect(() => {
    if (allUsersData) {
      const matchedUsersData = allUsersData?.map((user: any) => ({
        _id: user?.id,
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
      setValue(ADD_TO?.ADD_TO_DASHBOARD, BACKEND_REPORT_ACCESS?.DO_NOT_ADD);
    } else {
      if (
        allDashboardData?.dashboardDetails[SELECTED_ARRAY_LENGTH?.ZERO]?.reports
          ?.action === BACKEND_REPORT_ACCESS?.ADD_TO_NEW
      ) {
        setValue(ADD_TO?.ADD_TO_DASHBOARD, BACKEND_REPORT_ACCESS?.ADD_TO_NEW);
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
          ?.action === BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING
      ) {
        setValue(
          ADD_TO?.ADD_TO_DASHBOARD,
          BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING,
        );
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

  useEffect(() => {
    setReportValidation({
      selectSharedWith,
      selectAddToDashboard,
      selectAddToNewDashboard,
    });
    if (
      selectAddToDashboard === BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING ||
      selectAddToDashboard === BACKEND_REPORT_ACCESS?.DO_NOT_ADD
    ) {
      setValue(ADD_TO?.ADD_TO_NEW_CONDITION_TWO, null);
    }
  }, [selectSharedWith, selectAddToDashboard, selectAddToNewDashboard]);

  useEffect(() => {
    const permissionUser = getValues(ADD_TO?.SHARED_WITH_PERMISSIONS);
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
    setValue(ADD_TO?.SHARED_WITH_PERMISSIONS, finalResult);
  }, [sharedWithSpecificUser]);

  useEffect(() => {
    const permissionUser = getValues(ADD_TO?.NEW_DASHBOARD_PERMISSIONS);
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
    setValue(ADD_TO?.NEW_DASHBOARD_PERMISSIONS, finalResult);
  }, [newDashboardSpecificUser]);

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
                  fieldName: BACKEND_COLLECTION_NAME?.NO_OF_RECORDS,
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
                fieldType: FIELD_TYPE?.STRING,
                fieldName: item?.fieldName,
                status: item?.fieldValue,
                countFieldName: item?.title,
              },
            }),
            isDateFilter: item?.subFilter ?? false,
          };
        }),
        name: data?.reportName,
        accessLevel: {
          type: data?.sharedWith,
          ...(data?.sharedWith === BACKEND_REPORT_ACCESS?.EVERYONE && {
            access: data?.everyoneCondition,
          }),
          ...(data?.sharedWith === BACKEND_REPORT_ACCESS?.SPECIFIC_USERS && {
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
          productId: id,
          ...(data?.addToDashboard === BACKEND_REPORT_ACCESS?.ADD_TO_NEW && {
            name: data?.addToNewConditionOne,
          }),
          ...(data?.addToDashboard === BACKEND_REPORT_ACCESS?.ADD_TO_NEW && {
            access: data?.addToNewConditionTwo,
          }),
          ...(data?.addToNewConditionTwo ===
            BACKEND_REPORT_ACCESS?.SPECIFIC_USERS && {
            specialUsers: newDashboardSpecificUserWatch?.map(
              (item: UsersDropdownOptionsI) => ({
                userId: item?.userId,
                permission: item?.permission,
              }),
            ),
          }),
          ...(data?.addToNewConditionTwo ===
            BACKEND_REPORT_ACCESS?.EVERYONE && {
            permissions: data?.newDashboardEveryoneCondition,
          }),
          ...(data?.addToDashboard ===
            BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING && {
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
        errorSnackbar(err?.data?.message ?? 'Error in customize report');
      }
    } else {
      try {
        await postGenericReportTrigger(params)?.unwrap();
        successSnackbar('Report Created Successfully');
        handleMoveBack();
      } catch (err: any) {
        errorSnackbar(err?.data?.message ?? 'Error in creating report');
      }
    }
  };

  return {
    methods,
    watch,
    handleSubmit,
    onSubmit,
    selectAddToNewDashboard,
    reportsArray,
    postGenericReportStatus,
    patchGenericReportStatus,
  };
};
