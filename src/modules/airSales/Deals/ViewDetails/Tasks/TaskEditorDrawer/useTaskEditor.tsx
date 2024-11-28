import { useForm } from 'react-hook-form';
import {
  createTaskDefaultValues,
  dealsTasksValidationSchema,
} from './TaskEditor.data';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostDealsTasksManagementMutation,
  useUpdateDealsTasksManagementMutation,
} from '@/services/airSales/deals/view-details/tasks';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/redux/store';
import { useGetDealsTaskDetailsQuery } from '@/services/airSales/deals/view-details/tasks';
import { useEffect } from 'react';
import { DRAWER_ACTIONS_TITLES } from '@/constants/strings';

const useTaskEditor = ({ openDrawer, setOpenDrawer, selectedRecId }: any) => {
  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task_deals?.selectedDealsTaskIds,
  );

  const { data: taskDataDefault, isLoading: getTaskDataLoading } =
    useGetDealsTaskDetailsQuery(
      {
        id: selectedTaskIds[indexNumbers?.ZERO],
      },
      { skip: selectedTaskIds.length === indexNumbers?.ZERO },
    );

  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: createTaskDefaultValues(),
  });
  const { handleSubmit, reset } = methodsdealsTasks;
  useEffect(() => {
    reset(createTaskDefaultValues(taskDataDefault?.data));
  }, [taskDataDefault?.data, reset]);

  const [postDealsTasksManagement, { isLoading: postIsLoading }] =
    usePostDealsTasksManagementMutation();
  const [updatedDealsTasksManagement, { isLoading: updateIsLoading }] =
    useUpdateDealsTasksManagementMutation();

  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.name,
      type: values?.type,
      priority: values?.priority,
      ...(values?.status && { status: values?.status }),
      ...(values?.reminder && { reminder: values?.reminder }),
      ...(values?.assignTo && { assignTo: values?.assignTo?._id }),
      ...(values?.dueDate && {
        dueDate: dayjs(values?.dueDate)?.format(DATE_FORMAT?.API),
      }),
      note: values?.note,
      time: values?.time ?? '00:00',
      companiesIds: [],
      dealsIds: [selectedRecId],
      ticketsIds: [],
      contactsIds: [],
    };

    if (openDrawer === DRAWER_ACTIONS_TITLES?.EDIT) {
      try {
        await updatedDealsTasksManagement({
          body: payload,
          id: selectedTaskIds && selectedTaskIds[indexNumbers?.ZERO],
        }).unwrap();
        enqueueSnackbar('Task Updated Successfully', {
          variant: 'success',
        });
        onCloseDrawer();
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      try {
        await postDealsTasksManagement({
          body: payload,
        }).unwrap();
        enqueueSnackbar('Task Created Successfully', {
          variant: 'success',
        });
        onCloseDrawer();
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };

  const onCloseDrawer = () => {
    setOpenDrawer('');
    reset();
  };

  return {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    onCloseDrawer,
    postIsLoading,
    updateIsLoading,
    getTaskDataLoading,
  };
};

export default useTaskEditor;
