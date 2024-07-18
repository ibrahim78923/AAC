import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  reportsDataArray,
  reportsDefaultValues,
  reportsValidationSchema,
} from './SaveReportDrawer.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';
import {
  useLazyUsersDropdownQuery,
  usePostGenericReportsMutation,
  useLazyDashboardDropdownQuery,
} from '@/services/airOperations/reports/services-reports/upsert-services-reports';
import { CHARTS, REPORT_TYPE, FIELD_TYPE } from '@/constants/strings';
import {
  SaveReportI,
  usersDropdownOptionsI,
} from './SaveReportDrawer.interface';

export const useSaveReportDrawer = (props: any) => {
  const { form, setOpen, reportId, setForm, metricType } = props;
  const [reportValidation, setReportValidation] = useState<any>({
    selectSharedWith: '',
    selectAddToDashboard: '',
  });

  const saveReportsMethods = useForm({
    resolver: yupResolver<any>(reportsValidationSchema(reportValidation)),
    defaultValues: reportsDefaultValues,
  });

  const { watch, handleSubmit, reset, setValue } = saveReportsMethods;

  const ADD_TO = {
    ADD_TO_NEW_CONDITION_TWO: 'addToNewConditionTwo',
    ADD_TO_DASHBOARD: 'addToDashboard',
    SHARED_WITH: 'sharedWith',
  };

  const selectSharedWith = watch(ADD_TO?.SHARED_WITH);
  const selectAddToDashboard = watch(ADD_TO?.ADD_TO_DASHBOARD);
  const selectAddToNewDashboard = watch(ADD_TO?.ADD_TO_NEW_CONDITION_TWO);

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

  const dashboardDropdown = useLazyDashboardDropdownQuery();
  const usersDropdown = useLazyUsersDropdownQuery();
  const reportsArray = reportsDataArray(usersDropdown, dashboardDropdown);
  const [postGenericReportTrigger, postGenericReportStatus] =
    usePostGenericReportsMutation();

  const onSubmit = async (data: SaveReportI) => {
    const specificUsersIds = data?.specificUsersConditionOne?.map(
      (item: usersDropdownOptionsI) => item?._id,
    );
    const newDashboardSpecificUsersIds =
      data?.newDashboardSpecificUsersConditionOne?.map(
        (item: usersDropdownOptionsI) => item?._id,
      );
    const existingDashboardIds = data?.addToExistingCondition?.map(
      (item: any) => item?._id,
    );
    const getPermissions = () => {
      if (data?.addToNewConditionTwo === REPORT_TYPE?.EVERYONE) {
        return data?.newDashboardEveryoneCondition;
      } else if (data?.addToNewConditionTwo === REPORT_TYPE?.SPECIFIC_USERS) {
        return data?.newDashboardSpecificUsersConditionTwo;
      }
    };
    const payload = {
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
                collectionName: item?.xAxis?.ref ? item?.xAxis?.ref : '',
                selectedIds: item?.xAxis?.ref ? item?.xAxisType : [],
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
              collectionName: item?.xAxis?.ref ? item?.xAxis?.ref : '',
              selectedIds: item?.xAxis?.ref ? item?.xAxisType : [],
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
          // TODO: Functionality is missing in BA side
          // ...(item?.type === 'TEMPLATE_TEXT' && {
          //   templateText: {
          //     fieldType: "STATIC",
          //     fieldName: "totalAsset",
          //   },
          // }),

          isDateFilter: item?.subFilter ?? false,
        };
      }),
      name: data?.reportName,
      accessLevel: {
        type: data?.sharedWith,
        access:
          data?.sharedWith === REPORT_TYPE?.EVERYONE
            ? data?.everyoneCondition
            : data?.sharedWith === REPORT_TYPE?.SPECIFIC_USERS
              ? data?.specificUsersConditionTwo
              : null,
        users:
          data?.sharedWith === REPORT_TYPE?.SPECIFIC_USERS
            ? specificUsersIds
            : [],
      },
      isDateFilter: data?.addFilter,
      linkDashboard: {
        action: data?.addToDashboard,
        name:
          data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW
            ? data?.addToNewConditionOne
            : null,
        access:
          data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW
            ? data?.addToNewConditionTwo
            : null,
        specialUsers:
          data?.addToDashboard === REPORT_TYPE?.ADD_TO_NEW
            ? data?.addToNewConditionTwo === REPORT_TYPE?.SPECIFIC_USERS
              ? newDashboardSpecificUsersIds
              : []
            : [],
        ...((data?.addToNewConditionTwo === REPORT_TYPE?.EVERYONE ||
          data?.addToNewConditionTwo === REPORT_TYPE?.SPECIFIC_USERS) && {
          permissions: getPermissions(),
        }),
        existingDashboards:
          data?.addToDashboard === REPORT_TYPE?.ADD_TO_EXISTING
            ? existingDashboardIds
            : [],
      },
    };
    if (reportId) {
      try {
        successSnackbar('Report Edit Successfully');
        setForm([]);
        handleCancel();
      } catch (err: any) {
        errorSnackbar(err?.message ?? 'Error in Edit report');
      }
    } else {
      try {
        await postGenericReportTrigger(payload)?.unwrap();
        successSnackbar('Report Created Successfully');
        setForm([]);
        handleCancel();
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
  };
};
