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
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/redux/store';

const useTaskEditor = ({
  openDrawer,
  setOpenDrawer,
  selectedRecId,
  taskData,
}: any) => {
  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task_deals?.selectedDealsTaskIds,
  );
  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: createTaskDefaultValues({
      data:
        openDrawer === 'Edit' || openDrawer === 'View' ? taskData?.data : {},
    }),
  });

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

    if (openDrawer === 'Edit') {
      try {
        await updatedDealsTasksManagement({
          body: payload,
          id: selectedTaskIds && selectedTaskIds[0],
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

  const { handleSubmit, reset } = methodsdealsTasks;
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
  };
};

export default useTaskEditor;
