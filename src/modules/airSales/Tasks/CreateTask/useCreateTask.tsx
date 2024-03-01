import { useAppSelector } from '@/redux/store';
import { usePostCreateTaskMutation } from '@/services/airSales/task';
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

  const contactsSelectedIds = useAppSelector(
    (state: any) => state?.task?.contactsSelectedIds,
  );
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
    defaultValues: createTaskDefaultValues(),
  });
  const { handleSubmit: handleMethodFilter } = methodsFilter;

  const onSubmitHandler = async (values: any) => {
    if (creationMode) {
      try {
        await postCreateTask({
          body: {
            ...values,
            dueDate: dayjs(values?.dueDate)?.format(DATE_FORMAT?.API),
            time: '00:00',
            associate: 'Companies',
            companiesIds: companiesSelectedIds?.map((ele: any) => ele?.id),
            dealsIds: dealsSelectedIds?.map((ele: any) => ele?.id),
            ticketsIds: ticketsSelectedIds?.map((ele: any) => ele?.id),
            contactsIds: contactsSelectedIds?.map((ele: any) => ele?.id),
          },
        }).unwrap();
        enqueueSnackbar('Task Created Successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitHandler);

  const getCreateTaskData = createTaskData();

  return {
    theme,
    handleFiltersSubmit,
    getCreateTaskData,
    methodsFilter,
    onSubmitHandler,
  };
};

export default useCreateTask;
