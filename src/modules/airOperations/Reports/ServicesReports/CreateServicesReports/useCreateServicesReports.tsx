import { useEffect, useState } from 'react';
import { fieldsList, modalInitialState } from './CreateServicesReports.data';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';

export default function useCreateServicesReports() {
  const theme: any = useTheme();
  const router: any = useRouter();
  const methods: any = useForm({ defaultValues: { tableTitle: 'My Title' } });
  const { watch, setValue } = methods;
  const textTitle = watch('textTitle');
  const tableTitle = watch('tableTitle');
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [fieldData, setFieldData] = useState<any>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('black');
  const [htmlContent, setHtmlContent] = useState('');

  const [chartComponent, setChartComponent] = useState<JSX.Element | null>(
    null,
  );
  const [finalChartComponent, setFinalChartComponent] =
    useState<JSX.Element | null>(null);

  const getModalState = (draggedItem: any) => {
    const newModal: any = {
      chart: false,
      interactiveFilter: false,
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
    (modal?.chart || modal?.table || modal?.text || modal?.interactiveFilter) &&
      setFieldData(true);
  }, [modal?.text, modal?.chart, modal?.table, modal?.interactiveFilter]);

  const handleCancel = () => {
    setFieldData(false);
    setModal(modalInitialState);
  };

  const handleTextCancel = () => {
    setFieldData(false);
    setModal(modalInitialState);
    setHtmlContent('');
    setEditorState(EditorState.createEmpty());
  };

  const handleChartCancel = () => {
    setFieldData(false);
    setModal(modalInitialState);
    setChartComponent(null);
    setFinalChartComponent(null);
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
    setHtmlContent,
    htmlContent,
    textTitle,
    handleTextCancel,
    setChartComponent,
    chartComponent,
    setFinalChartComponent,
    finalChartComponent,
    handleChartCancel,
    tableTitle,
    setValue,
    setOpenDrawer,
    openDrawer,
  };
}
