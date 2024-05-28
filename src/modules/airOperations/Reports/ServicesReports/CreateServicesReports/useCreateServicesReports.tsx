import { useEffect, useState } from 'react';
import { fieldsList, modalInitialState } from './CreateServicesReports.data';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function useCreateServicesReports() {
  const theme: any = useTheme();
  const router: any = useRouter();
  const methods: any = useForm();
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [fieldData, setFieldData] = useState<any>(false);

  const [text, setText] = useState('');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [color, setColor] = useState('black');
  const [fontSize, setFontSize] = useState('16px');
  const [textAlign, setTextAlign] = useState('left');
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [capitalCase, setCapitalCase] = useState(false);
  const [alignItem, setAlignItem] = useState('left');

  const applyFormat = (format: string) => {
    if (format === 'bold') {
      setBold(!bold);
    } else if (format === 'italic') {
      setItalic(!italic);
    } else if (format === 'underline') {
      setUnderline(!underline);
    } else if (['left', 'center', 'right'].includes(format)) {
      setTextAlign(format);
    } else if (format === 'upper') {
      setUpperCase(true);
      setLowerCase(false);
      setCapitalCase(false);
    } else if (format === 'lower') {
      setLowerCase(true);
      setUpperCase(false);
      setCapitalCase(false);
    } else if (format === 'capital') {
      setCapitalCase(true);
      setUpperCase(false);
      setLowerCase(false);
    } else if (format === 'top') {
      setAlignItem('top');
    } else if (format === 'middle') {
      setAlignItem('middle');
    } else if (format === 'bottom') {
      setAlignItem('bottom');
    }
  };

  const capitalizeText = (text: string) => {
    return text.replace(/(?:^|\.\s*)\w/g, (match: any) => match.toUpperCase());
  };
  const formattedText = upperCase
    ? text.toUpperCase()
    : lowerCase
    ? text.toLowerCase()
    : capitalCase
    ? capitalizeText(text)
    : text;

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
    formattedText,
    applyFormat,
    setText,
    bold,
    italic,
    underline,
    color,
    fontSize,
    textAlign,
    alignItem,
    setFontSize,
    setColor,
    methods,
  };
}
