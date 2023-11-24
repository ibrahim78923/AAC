import { useForm } from 'react-hook-form';

import {
  dealsTasksDefaultValues,
  dealsTasksValidationSchema,
} from './TaskEditor.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePostDealsTasksManagementMutation } from '@/services/airSales/deals/view-details/tasks';

const useTaskEditor = () => {
  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: dealsTasksDefaultValues,
  });

  const [postDealsTasksManagement] = usePostDealsTasksManagementMutation();

  const onSubmit = async (values) => {
    // const { dueDate, ...rest } = values;
    // const DueDate = dayjs(dueDate).format();

    try {
      postDealsTasksManagement({ body: values });
    } catch (error) {}
  };
  const { handleSubmit } = methodsdealsTasks;
  return { handleSubmit, onSubmit, methodsdealsTasks };
};

export default useTaskEditor;
