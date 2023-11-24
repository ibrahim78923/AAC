import { useForm } from 'react-hook-form';

import {
  dealsTasksDefaultValues,
  dealsTasksValidationSchema,
} from './TaskEditor.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePostDealsTasksManagementMutation } from '@/services/airSales/deals/view-details/tasks';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

const useTaskEditor = () => {
  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: dealsTasksDefaultValues,
  });

  const [postDealsTasksManagement] = usePostDealsTasksManagementMutation();

  const onSubmit = async (values: any) => {
    const { dueDate, ...rest } = values;
    const DueDate = dayjs(dueDate).format(DATE_FORMAT.API);
    const body = {
      dueDate: DueDate,
      ...rest,
    };
    try {
      await postDealsTasksManagement({ body }).unwrap();
    } catch (error) {
      const errMsg = error?.data?.message[0];
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  const { handleSubmit } = methodsdealsTasks;
  return { handleSubmit, onSubmit, methodsdealsTasks };
};

export default useTaskEditor;
