import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  reportsDataArray,
  reportsDefaultValues,
  reportsValidationSchema,
} from './SaveReportDrawer.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';
import { CHARTS, REPORT_TYPE, FIELD_TYPE } from '@/constants/strings';
import {
  useLazyUsersDropdownQuery,
  usePostMarketingReportsMutation,
} from '@/services/airOperations/reports/marketing-reports/upsert-marketing-reports';
import {
  SaveReportDrawerPropsI,
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
    ADD_TO_EXISTING: 'addToExisting',
    DO_NOT_ADD: 'doNotAdd',
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
      selectAddToDashboard === ADD_TO?.ADD_TO_EXISTING ||
      selectAddToDashboard === ADD_TO?.DO_NOT_ADD
    ) {
      setValue(ADD_TO?.ADD_TO_NEW_CONDITION_TWO, null);
    }
  }, [selectSharedWith, selectAddToDashboard, selectAddToNewDashboard]);

  const usersDropdown = useLazyUsersDropdownQuery();
  const reportsArray = reportsDataArray(usersDropdown);
  const [postMarketingReportTrigger, postMarketingReportStatus] =
    usePostMarketingReportsMutation();

  const onSubmit = async (data: SaveReportDrawerPropsI) => {
    const specificUsersIds = data?.specificUsersConditionOne?.map(
      (item: usersDropdownOptionsI) => item?._id,
    );
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
            : data?.specificUsersConditionTwo,
        users:
          data?.sharedWith === REPORT_TYPE?.SPECIFIC_USERS
            ? specificUsersIds
            : [],
      },
      isDateFilter: data?.addFilter,
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
        await postMarketingReportTrigger(payload)?.unwrap();
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
    postMarketingReportStatus,
  };
};
