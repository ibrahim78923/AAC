import { useAppSelector } from '@/redux/store';
import {
  useGetTaskDetailsQuery,
  usePatchCreateTaskMutation,
  usePostCreateTaskMutation,
} from '@/services/airSales/task';
import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import {
  createTaskData,
  createTaskDefaultValues,
  createTaskValidationSchema,
} from '../Task.data';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const useCreateTask = ({ creationMode }: any) => {
  const theme = useTheme();

  const [postCreateTask] = usePostCreateTaskMutation();
  const [patchCreateTask] = usePatchCreateTaskMutation();

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task?.selectedTaskIds,
  );

  const contactsSelectedIds = useAppSelector(
    (state: any) => state?.task?.contactsSelectedIds,
  );

  const { data: taskData } = useGetTaskDetailsQuery({
    id: selectedTaskIds?.length === 1 && selectedTaskIds[0],
  });

  const dealsSelectedIds = useAppSelector(
    (state: any) => state?.task?.dealsSelectedIds,
  );
  const ticketsSelectedIds = useAppSelector(
    (state: any) => state?.task?.ticketsSelectedIds,
  );
  const companiesSelectedIds = useAppSelector(
    (state: any) => state?.task?.companiesSelectedIds,
  );

  const methodsFilter: any = useForm({
    resolver: yupResolver(createTaskValidationSchema),
    defaultValues: createTaskDefaultValues({ data: taskData?.data }),
  });

  const { handleSubmit: handleMethodFilter } = methodsFilter;

  const onSubmitHandler = async (values: any) => {
    const payload = {
      name: values?.name,
      type: values?.type,
      priority: values?.priority,
      status: values?.status,
      reminder: values?.reminder,
      note: values?.note,
      dueDate: dayjs(values?.dueDate)?.format(DATE_FORMAT?.API),
      time: values?.time ?? '00:00',
      companiesIds: companiesSelectedIds?.map((ele: any) => ele?.id),
      dealsIds: dealsSelectedIds?.map((ele: any) => ele?.id),
      ticketsIds: ticketsSelectedIds?.map((ele: any) => ele?.id),
      contactsIds: contactsSelectedIds?.map((ele: any) => ele?.id),
      ...(values?.assignTo && { assignTo: values?.assignTo }),
    };
    if (creationMode === 'create') {
      try {
        await postCreateTask({
          body: payload,
        }).unwrap();
        enqueueSnackbar('Task Created Successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      try {
        await patchCreateTask({
          body: payload,
          id: selectedTaskIds && selectedTaskIds[0],
        }).unwrap();
        enqueueSnackbar('Task Updated Successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitHandler);

  const getCreateTaskData = createTaskData({ data: taskData?.data });

  return {
    theme,
    handleFiltersSubmit,
    getCreateTaskData,
    methodsFilter,
    onSubmitHandler,
  };
};

export default useCreateTask;
