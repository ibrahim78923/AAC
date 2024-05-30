import { useState } from 'react';
import {
  componentToMatchMap,
  fieldsList,
  modalInitialState,
} from './VendorFields.data';
import { useRouter } from 'next/router';

export default function useVendorFields() {
  const router: any = useRouter();
  const [form, setForm] = useState<any>([]);
  const [modal, setModal] = useState<any>(modalInitialState);
  const [editId, setEditId] = useState<any>(null);

  const getModalState = (item: any) => {
    const newModal: any = {
      ...modalInitialState,
    };

    if (item?.component) {
      const matchTypes = componentToMatchMap[item?.component];
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
      const fieldType = fieldsList?.find((field) => field?.id === item?.id);
      if (fieldType) {
        newModal[fieldType?.match] = true;
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
      setEditId(null);
    }
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
  };
}
