import { useEffect, useState } from 'react';
import {
  defaultValues,
  fieldsList,
  modalInitialState,
  templateList,
} from './UpsertSalesReports.data';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { CHARTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import { HorizontalBarChart } from '@/components/GenericReport/DraggableFormFields/Chart/HorizontalBarChart';
import { BarChart } from '@/components/GenericReport/DraggableFormFields/Chart/BarChart';
import { DonutChart } from '@/components/GenericReport/DraggableFormFields/Chart/DonutChart';
import { PieChart } from '@/components/GenericReport/DraggableFormFields/Chart/PieChart';
export default function useUpsertSalesReports() {
  const [draggedItemData, setDraggedItemData] = useState<any>(null);
  const theme: any = useTheme();
  const router: any = useRouter();
  const reportId = router?.query?.reportId;
  const methods: any = useForm({
    defaultValues: defaultValues(),
  });

  const { watch, setValue } = methods;
  const textTitle = watch('textTitle');
  const tableTitle = watch('tableTitle');
  const chartTitle = watch('chartTitle');
  const chartType = watch('chartType');
  const xAxisData = watch('xAxis');
  const subFilter = watch('subFilter');
  const xAxisType = watch('xAxisType');
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [fieldData, setFieldData] = useState<any>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('black');
  const [metricType, setMetricType] = useState('DEALS');
  const [AddProperties, setAddProperties] = useState();
  const [columnsData, setColumnsData] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [disableTemplate, setDisableTemplate] = useState(false);
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
    textTitle,
    tableTitle,
    setValue,
    AddProperties,
    setAddProperties,
    columnsData,
    setColumnsData,
    setOpenDrawer,
    openDrawer,
    chartType,
    setMetricType,
    metricType,
    chartTitle,
    xAxisData,
    subFilter,
    allChartComponents,
    showTemplate,
    setShowTemplate,
    handleTemplateDragEnd,
    router,
    handleCancel,
    reportId,
    setDraggedItemData,
    draggedItemData,
    disableTemplate,
    handleChooseTemplate,
    xAxisType,
  };
}
