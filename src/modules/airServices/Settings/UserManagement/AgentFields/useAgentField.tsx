import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_IDS,
  dynamicFormComponentToMatchMap,
  dynamicFormFieldsList,
  dynamicFormModalsInitialState,
} from '@/utils/dynamic-forms';

export default function useAgentFields() {
  const router: any = useRouter();

  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(dynamicFormModalsInitialState);
  const [editId, setEditId] = useState<any>(null);
  const [overlay, setOverlay] = useState(false);

  const [getDynamicFieldsTrigger, { isLoading, isFetching, isError }] =
    useLazyGetDynamicFieldsQuery();

  const getBackendData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_ADD_AGENT,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getBackendData();
  }, []);

  const getModalState = (item: any) => {
    const newModal: any = {
      ...dynamicFormModalsInitialState,
    };

    if (item?.component) {
      const matchTypes = dynamicFormComponentToMatchMap[item?.component];
      if (Array?.isArray(matchTypes)) {
        if (item?.componentProps?.multiline) {
          newModal['paragraphText'] = true;
        } else if (matchTypes?.includes('text')) {
          newModal['text'] = true;
        }
      } else if (matchTypes) {
        newModal[matchTypes] = true;
      }
    } else if (item?.id !== undefined) {
      const fieldType = dynamicFormFieldsList?.find(
        (field) => field?.id === item?.id,
      );
      if (fieldType) {
        newModal[fieldType?.match] = true;
      }
    }
    return newModal;
  };

  const handleDragStart = () => {
    setOverlay(true);
  };

  const handleDragEnd = (result: any) => {
    if (result?.destination?.droppableId === DYNAMIC_FORM_IDS?.DROPPABLE_ID) {
      const draggedItem = dynamicFormFieldsList?.find(
        (item: any) => item?.id === result?.draggableId,
      );
      setModal(getModalState(draggedItem));
      setEditId(null);
    }
    setOverlay(false);
  };

  const handleEdit = (id: string) => {
    const itemToEdit = form?.find((item: any) => item?.id === id);
    if (itemToEdit) {
      setModal(getModalState(itemToEdit));
      setEditId(id);
    }
  };

  return {
    handleDragEnd,
    router,
    form,
    setForm,
    modal,
    setModal,
    handleEdit,
    editId,
    isLoading,
    isFetching,
    isError,
    getBackendData,
    handleDragStart,
    overlay,
  };
}
