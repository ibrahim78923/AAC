import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  useGetTaskDetailsQuery,
  useLazyGetAssignedUsersQuery,
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
import { useEffect } from 'react';
import {
  setCompaniesSelectedIds,
  setContactsSelectedIds,
  setDealsSelectedIds,
  setTicketsSelectedIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';

const useCreateTask = ({ creationMode, setIsCreateTaskDrawerOpen }: any) => {
  const theme = useTheme();
  const dispatch: any = useAppDispatch();

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

  useEffect(() => {
    if (taskData?.data?.contactsIds) {
      dispatch(
        setContactsSelectedIds(
          taskData?.data?.contactsIds?.map((item: any) => ({
            label: item?.name,
            id: item?._id,
          })),
        ),
      );
    }
    if (taskData?.data?.ticketsIds) {
      dispatch(
        setTicketsSelectedIds(
          taskData?.data?.ticketsIds?.map((item: any) => ({
            label: item?.name,
            id: item?._id,
          })),
        ),
      );
    }
    if (taskData?.data?.companiesIds) {
      dispatch(
        setCompaniesSelectedIds(
          taskData?.data?.companiesIds?.map((item: any) => ({
            label: item?.name,
            id: item?._id,
          })),
        ),
      );
    }
    if (taskData?.data?.dealsIds) {
      dispatch(
        setDealsSelectedIds(
          taskData?.data?.dealsIds?.map((item: any) => ({
            label: item?.name,
            id: item?._id,
          })),
        ),
      );
    }
  }, [taskData?.data]);

  const { handleSubmit: handleMethodFilter } = methodsFilter;

  const onSubmitHandler = async (values: any) => {
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
      companiesIds: companiesSelectedIds?.map((ele: any) => ele?.id),
      dealsIds: dealsSelectedIds?.map((ele: any) => ele?.id),
      ticketsIds: ticketsSelectedIds?.map((ele: any) => ele?.id),
      contactsIds: contactsSelectedIds?.map((ele: any) => ele?.id),
    };
    if (creationMode === 'create') {
      try {
        await postCreateTask({
          body: payload,
        }).unwrap();
        enqueueSnackbar('Task Created Successfully', {
          variant: 'success',
        });
        setIsCreateTaskDrawerOpen(false);
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
        setIsCreateTaskDrawerOpen(false);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitHandler);

  const usersData = useLazyGetAssignedUsersQuery();

  const getCreateTaskData = createTaskData({ data: taskData?.data, usersData });

  return {
    theme,
    handleFiltersSubmit,
    getCreateTaskData,
    methodsFilter,
    onSubmitHandler,
    taskData,
  };
};

export default useCreateTask;
