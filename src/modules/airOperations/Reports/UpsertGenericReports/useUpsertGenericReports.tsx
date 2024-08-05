import { useEffect, useState } from 'react';
import {
  defaultValues,
  fieldsList,
  modalInitialState,
  templateList,
} from './UpsertGenericReports.data';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import {
  CHARTS,
  FIELD_TYPE,
  GENERIC_REPORT_MODULES,
  REPORT_TYPE,
} from '@/constants/strings';
import { useRouter } from 'next/router';
import { DonutChart } from './DraggableFormFields/Chart/DonutChart';
import { PieChart } from './DraggableFormFields/Chart/PieChart';
import { HorizontalBarChart } from './DraggableFormFields/Chart/HorizontalBarChart';
import { BarChart } from './DraggableFormFields/Chart/BarChart';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { useGetSingleGenericReportsQuery } from '@/services/airOperations/reports/upsert-generic-reports';
import { AIR_OPERATIONS } from '@/constants';

export default function useUpsertGenericReports() {
  const [draggedItemData, setDraggedItemData] = useState<any>(null);
  const theme: any = useTheme();
  const router: any = useRouter();
  const reportId = router?.query?.reportId;
  const moduleName = router?.query?.moduleName;

  const params = {
    id: reportId,
  };
  const { data, isLoading, isFetching } = useGetSingleGenericReportsQuery(
    params,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!reportId,
    },
  );
  const singleReport = (data as any)?.data?.results?.genericReports;

  const getDefaultModule = () => {
    switch (moduleName) {
      case GENERIC_REPORT_MODULES?.SERVICES:
        return REPORT_TYPE?.INVENTORIES;
      case GENERIC_REPORT_MODULES?.SALES:
        return REPORT_TYPE?.DEALS;
      case GENERIC_REPORT_MODULES?.MARKETING:
        return REPORT_TYPE?.LEADS;
      default:
        return [];
    }
  };
  const defaultModule = getDefaultModule();

  const methods: any = useForm({
    defaultValues: defaultValues(),
  });

  const { watch, setValue } = methods;
  const chartType = watch('chartType');
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [fieldData, setFieldData] = useState<any>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('black');
  const [metricType, setMetricType] = useState(defaultModule);
  const [columnsData, setColumnsData] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [disableTemplate, setDisableTemplate] = useState(false);
  useEffect(() => {
    if (singleReport) {
      setMetricType(singleReport?.module);
    }
  }, [singleReport]);
  useEffect(() => {
    setValue('chartType', draggedItemData?.chartType ?? '');
    setValue('xAxis', draggedItemData?.xAxis ?? null);
    setValue('subFilter', draggedItemData?.subFilter ?? false);
    setValue('chartTitle', draggedItemData?.title ?? 'Report Chart');
    setValue('textTitle', draggedItemData?.title ?? 'Report Text');
    setValue('tableTitle', draggedItemData?.title ?? 'Report Table');
    setColumnsData(draggedItemData?.tableColumns ?? []);
  }, [draggedItemData]);
  useEffect(() => {
    if (!draggedItemData) {
      setValue('xAxis', null);
      setValue('xAxisType', []);
    }
  }, [chartType]);

  const getModalState = (draggedItem: any) => {
    const newModal: any = {
      chart: false,
      text: false,
      table: false,
      counter: false,
    };

    if (draggedItem?.id !== undefined) {
      if (fieldsList[draggedItem?.id]) {
        const itemType = fieldsList[draggedItem?.id]?.match;
        if (newModal?.hasOwnProperty(itemType)) {
          newModal[itemType] = true;
        }
      }
    }
    return newModal;
  };

  const handleDragEnd = (result: any) => {
    if (result?.destination?.droppableId === 'droppable') {
      const draggedItem = fieldsList?.find(
        (item: any) => item?.id === result?.draggableId,
      );
      setModal(getModalState(draggedItem));
    }
  };

  const getTemplateModalState = (draggedItem: any) => {
    setDraggedItemData(draggedItem);
    setDisableTemplate(true);
    const newModal: any = {
      chart: false,
      text: false,
      table: false,
      counter: false,
    };

    if (draggedItem?.id !== undefined) {
      if (templateList[draggedItem?.id]) {
        const itemType = templateList[draggedItem?.id]?.match;
        if (newModal?.hasOwnProperty(itemType)) {
          newModal[itemType] = true;
        }
      }
    }
    return newModal;
  };

  const handleTemplateDragEnd = (result: any) => {
    if (result?.destination?.droppableId === 'droppable') {
      const draggedItem = templateList?.find(
        (item: any) => item?.id === result?.draggableId,
      );
      setModal(getTemplateModalState(draggedItem));
    }
  };

  useEffect(() => {
    (modal?.chart || modal?.table || modal?.text || modal?.counter) &&
      setFieldData(true);
  }, [modal?.text, modal?.chart, modal?.table, modal?.counter]);

  const allChartComponents = {
    [CHARTS?.BAR_CHART]: <BarChart />,
    [CHARTS?.DONUT_CHART]: <DonutChart />,
    [CHARTS?.PIE_CHART]: <PieChart />,
    [CHARTS?.HORIZONTAL_BAR_CHART]: <HorizontalBarChart />,
  };

  const handleCancel = () => {
    setFieldData(false);
    setModal(modalInitialState);
    setColumnsData([]);
    setValue('tableTitle', 'Report Table');
    setEditorState(EditorState.createEmpty());
    setValue('textTitle', 'Report Text');
    setValue('chartType', '');
    setValue('chartTitle', 'Report Chart');
    setValue('subFilter', false);
    setDraggedItemData(null);
  };
  const handleChooseTemplate = () => {
    setDisableTemplate(false);
    setShowTemplate(false);
  };

  useEffect(() => {
    if (singleReport) {
      const newFormItems = singleReport?.widgets
        ?.map((item: any, index: any) => {
          const uniqueId = generateUniqueId();
          if (item?.type === REPORT_TYPE?.TEXT) {
            return {
              id: uniqueId,
              component: item?.text?.description,
              title: item?.title,
              type: REPORT_TYPE?.TEXT,
            };
          }
          if (
            item?.type === REPORT_TYPE?.TABLE ||
            item?.type === REPORT_TYPE?.TEMPLATE_TABLE
          ) {
            return {
              id: uniqueId,
              type: REPORT_TYPE?.TABLE,
              title: item?.title,
              component: item?.table?.fields.map(
                (field: any) => field?.fieldName,
              ),
              columnObject: item?.table?.fields,
              templateType:
                item?.type === REPORT_TYPE?.TEMPLATE_TABLE ? item?.type : false,
            };
          }
          if (
            item?.type === CHARTS?.BAR_CHART ||
            item?.type === CHARTS?.HORIZONTAL_BAR_CHART ||
            item?.type === CHARTS?.DONUT_CHART ||
            item?.type === CHARTS?.PIE_CHART ||
            item?.type === CHARTS?.TEMPLATE_BAR_CHART ||
            item?.type === CHARTS?.TEMPLATE_HORIZONTAL_CHART ||
            item?.type === CHARTS?.TEMPLATE_PIE_CHART ||
            item?.type === CHARTS?.TEMPLATE_DONUT_CHART
          ) {
            return {
              id: uniqueId,
              title: item?.title,
              reportType: REPORT_TYPE?.CHART,
              type:
                item?.type === CHARTS?.TEMPLATE_BAR_CHART ||
                item?.type === CHARTS?.BAR_CHART
                  ? CHARTS?.BAR_CHART
                  : item?.type === CHARTS?.TEMPLATE_HORIZONTAL_CHART ||
                      item?.type === CHARTS?.HORIZONTAL_BAR_CHART
                    ? CHARTS?.HORIZONTAL_BAR_CHART
                    : item?.type === CHARTS?.TEMPLATE_PIE_CHART ||
                        item?.type === CHARTS?.PIE_CHART
                      ? CHARTS?.PIE_CHART
                      : item?.type === CHARTS?.TEMPLATE_DONUT_CHART ||
                          item?.type === CHARTS?.DONUT_CHART
                        ? CHARTS?.DONUT_CHART
                        : null,
              templateType:
                item?.type === CHARTS?.TEMPLATE_BAR_CHART ||
                item?.type === CHARTS?.TEMPLATE_HORIZONTAL_CHART ||
                item?.type === CHARTS?.TEMPLATE_PIE_CHART ||
                item?.type === CHARTS?.TEMPLATE_DONUT_CHART
                  ? item?.type
                  : false,
              xAxis:
                item?.type === CHARTS?.DONUT_CHART ||
                item?.type === CHARTS?.PIE_CHART ||
                item?.type === CHARTS?.TEMPLATE_DONUT_CHART ||
                item?.type === CHARTS?.TEMPLATE_PIE_CHART
                  ? {
                      value: item?.genericChart?.fieldName,
                      ref:
                        item?.genericChart?.fieldType === FIELD_TYPE?.OBJECT_ID
                          ? item?.genericChart?.collectionName
                          : null,
                    }
                  : {
                      value: item?.barChart?.xAxis?.fieldName,
                      ref:
                        item?.barChart?.xAxis?.fieldType ===
                        FIELD_TYPE?.OBJECT_ID
                          ? item?.barChart?.xAxis?.collectionName
                          : null,
                    },
              xAxisType:
                item?.type === CHARTS?.DONUT_CHART ||
                item?.type === CHARTS?.PIE_CHART ||
                item?.type === CHARTS?.TEMPLATE_DONUT_CHART ||
                item?.type === CHARTS?.TEMPLATE_PIE_CHART
                  ? item?.genericChart?.fieldType === FIELD_TYPE?.OBJECT_ID
                    ? item?.genericChart?.selectedIds
                    : null
                  : item?.barChart?.xAxis?.fieldType === FIELD_TYPE?.OBJECT_ID
                    ? item?.barChart?.xAxis?.selectedIds
                    : null,
              subFilter: item?.isDateFilter,
            };
          }
          if (item?.type === REPORT_TYPE?.TEMPLATE_TEXT) {
            return {
              id: uniqueId,
              reportType: REPORT_TYPE?.COUNTER,
              ticketCount: index,
              title: item?.title,
              templateType: REPORT_TYPE?.TEMPLATE_TEXT,
            };
          }
          return null;
        })
        .filter(Boolean);
      setForm(() => [...newFormItems]);
    }
  }, [singleReport]);

  const handleMoveBack = () => {
    switch (moduleName) {
      case GENERIC_REPORT_MODULES?.SERVICES:
        return router?.push({
          pathname: AIR_OPERATIONS?.SERVICES_REPORTS,
        });
      case GENERIC_REPORT_MODULES?.SALES:
        return router?.push({
          pathname: AIR_OPERATIONS?.SALES_REPORTS,
        });
      case GENERIC_REPORT_MODULES?.MARKETING:
        return router?.push({
          pathname: AIR_OPERATIONS?.MARKETING_REPORTS,
        });
      default:
        return [];
    }
  };

  return {
    handleDragEnd,
    form,
    setForm,
    modal,
    setModal,
    theme,
    setFieldData,
    fieldData,
    methods,
    setEditorState,
    editorState,
    setColor,
    color,
    setFontSize,
    fontSize,
    setValue,
    columnsData,
    setColumnsData,
    setOpenDrawer,
    openDrawer,
    setMetricType,
    metricType,
    allChartComponents,
    showTemplate,
    setShowTemplate,
    handleTemplateDragEnd,
    handleCancel,
    reportId,
    setDraggedItemData,
    draggedItemData,
    disableTemplate,
    handleChooseTemplate,
    moduleName,
    isLoading,
    isFetching,
    data,
    handleMoveBack,
    watch,
  };
}
