import { useEffect, useState } from 'react';
import {
  fieldsList,
  modalInitialState,
  templateList,
} from './UpsertServicesReports.data';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { CHARTS } from '@/constants/strings';
import { DonutChart } from './DraggableFormFields/Chart/DonutChart';
import { PieChart } from './DraggableFormFields/Chart/PieChart';
import { BarChart } from './DraggableFormFields/Chart/BarChart';
import { useRouter } from 'next/router';

export default function useUpsertServicesReports() {
  const theme: any = useTheme();
  const router: any = useRouter();
  const methods: any = useForm({
    defaultValues: {
      chartTitle: 'Report Chart',
      tableTitle: 'Report Table',
      textTitle: 'Report Text',
    },
  });
  const { watch, setValue } = methods;
  const textTitle = watch('textTitle');
  const tableTitle = watch('tableTitle');
  const chartTitle = watch('chartTitle');
  const chartType = watch('chartType');
  const xAxisData = watch('xAxis');
  const yAxisData = watch('yAxis');
  const subFilter = watch('subFilter');
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [fieldData, setFieldData] = useState<any>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('black');
  const [metricType, setMetricType] = useState('Inventories');
  const [chartMetricType, setChartMetricType] = useState('Add Metric');
  const [AddProperties, setAddProperties] = useState();
  const [columnsData, setColumnsData] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);

  useEffect(() => {
    setValue('xAxis', '');
    setValue('yAxis', '');
    setChartMetricType('Add Metric');
  }, [chartType]);

  const getModalState = (draggedItem: any) => {
    const newModal: any = {
      chart: false,
      text: false,
      table: false,
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
    const newModal: any = {
      chart: false,
      text: false,
      table: false,
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
    (modal?.chart || modal?.table || modal?.text) && setFieldData(true);
  }, [modal?.text, modal?.chart, modal?.table]);

  const allChartComponents = {
    [CHARTS?.BAR_CHART]: <BarChart />,
    [CHARTS?.DONUT_CHART]: <DonutChart />,
    [CHARTS?.PIE_CHART]: <PieChart />,
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
    yAxisData,
    xAxisData,
    setChartMetricType,
    chartMetricType,
    subFilter,
    allChartComponents,
    showTemplate,
    setShowTemplate,
    handleTemplateDragEnd,
    router,
  };
}
