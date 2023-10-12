import {
  dealsTasksDefaultValues,
  dealsTasksValidationSchema,
} from './TaskEditor.data';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

const useTaskEditor = () => {
  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: dealsTasksDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsdealsTasks;
  return { handleSubmit, onSubmit, methodsdealsTasks };
};

export default useTaskEditor;
