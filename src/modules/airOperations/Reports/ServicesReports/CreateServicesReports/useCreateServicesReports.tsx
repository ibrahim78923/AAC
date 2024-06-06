import { useEffect, useState } from 'react';
import { fieldsList, modalInitialState } from './CreateServicesReports.data';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { CHARTS } from '@/constants/strings';
import { DonutChart } from './DraggableFormFields/Chart/DonutChart';
import { PieChart } from './DraggableFormFields/Chart/PieChart';
import { BarChart } from './DraggableFormFields/Chart/BarChart';

export default function useCreateServicesReports() {
  const theme: any = useTheme();
  const router: any = useRouter();
  const methods: any = useForm({
    defaultValues: {
      chartTitle: 'Report Chart',
      tableTitle: 'Table',
      textTitle: 'Report Text',
    },
  });
  const { watch, setValue } = methods;
  const textTitle = watch('textTitle');
  const tableTitle = watch('tableTitle');
  const chartTitle = watch('chartTitle');
  const chartType = watch('chartType');
  const xAxesData = watch('xAxes');
  const yAxesData = watch('yAxes');
  const subFilter = watch('subFilter');
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [fieldData, setFieldData] = useState<any>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('black');
  const [metricType, setMetricType] = useState('Metrics');
  const [chartMetricType, setChartMetricType] = useState('Add Metrics');
  const [AddProperties, setAddProperties] = useState();
  const [columnsData, setCloumnsData] = useState([]);
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

  useEffect(() => {
    (modal?.chart || modal?.table || modal?.text) && setFieldData(true);
  }, [modal?.text, modal?.chart, modal?.table]);

  const handleCancel = () => {
    setFieldData(false);
    setModal(modalInitialState);
  };

  const allChartComponents = {
    [CHARTS.BAR_CHART]: <BarChart />,
    [CHARTS.DONUT_CHART]: <DonutChart />,
    [CHARTS.PIE_CHART]: <PieChart />,
  };

  return {
    handleDragEnd,
    router,
    form,
    setForm,
    modal,
    setModal,
    theme,
    setFieldData,
    fieldData,
    handleCancel,
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
    setCloumnsData,
    setOpenDrawer,
    openDrawer,
    chartType,
    setMetricType,
    metricType,
    chartTitle,
    yAxesData,
    xAxesData,
    setChartMetricType,
    chartMetricType,
    subFilter,
    allChartComponents,
  };
}
