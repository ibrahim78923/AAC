import { successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toDoListFormDefaultValues } from './ToDoList.data';
export const useToDoList = () => {
  const [newTodoItem, setNewTodoItem] = useState(false);
  const methods = useForm({
    defaultValues: toDoListFormDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    setNewTodoItem?.(false);
    successSnackbar('Call Tag Added Successfully');
  };
  return {
    newTodoItem,
    setNewTodoItem,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};
