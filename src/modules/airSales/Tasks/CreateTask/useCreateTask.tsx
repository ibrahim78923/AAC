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
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  setCompaniesSelectedIds,
  setContactsSelectedIds,
  setDealsSelectedIds,
  setSelectedTaskIds,
  setTicketsSelectedIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';
import { TASK_TYPE } from '@/constants';

const useCreateTask = ({
  creationMode,
  setIsCreateTaskDrawerOpen,
  setIsLoading,
}: any) => {
  const theme = useTheme();
  const dispatch: any = useAppDispatch();

  const [postCreateTask, { status: postTaskLoading }] =
    usePostCreateTaskMutation();
  const [patchCreateTask, { status: patchTaskLoading }] =
    usePatchCreateTaskMutation();

  // custom fields ++
  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_TASK,
    };
    const getDynamicFieldsParameters = { params };
    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };
  useEffect(() => {
    getDynamicFormData();
  }, []);
  // custom fields --

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task?.selectedTaskIds,
  );

  const contactsSelectedIds = useAppSelector(
    (state: any) => state?.task?.contactsSelectedIds,
  );

  const { data: taskData } = useGetTaskDetailsQuery(
    {
      id: selectedTaskIds?.length === 1 && selectedTaskIds[0],
    },
    { skip: selectedTaskIds?.length > 0 ? false : true },
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
    resolver: yupResolver(createTaskValidationSchema?.(form)),
    defaultValues: createTaskDefaultValues({
      data: taskData?.data,
      form,
    }),
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

  const { handleSubmit: handleMethodFilter, reset } = methodsFilter;

  useEffect(() => {
    reset(() => createTaskDefaultValues({ data: taskData?.data, form }));
  }, [taskData?.data, reset, form]);

  const onSubmitHandler = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);

    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );

    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
        if (value instanceof Date) {
          value = value?.toISOString();
        }
        if (
          typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
          !Array?.isArray(value) &&
          value !== null
        ) {
          customFields[key] = { ...customFields[key], ...value };
        } else {
          customFields[key] = value;
        }
      } else {
        body[key] = value;
      }
    });

    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
    }

    useEffect(() => {}, []);

    const payload = {
      ...body,
      companiesIds: companiesSelectedIds?.map((ele: any) => ele?.id),
      dealsIds: dealsSelectedIds?.map((ele: any) => ele?.id),
      ticketsIds: ticketsSelectedIds?.map((ele: any) => ele?.id),
      contactsIds: contactsSelectedIds?.map((ele: any) => ele?.id),
      ...(values?.assignTo && { assignTo: values?.assignTo?._id }),
    };

    if (creationMode === TASK_TYPE?.CREATE_TASK) {
      setIsLoading(true);
      try {
        await postCreateTask({
          body: payload,
        }).unwrap();
        enqueueSnackbar('Task Created Successfully', {
          variant: 'success',
        });
        setIsLoading(false);
        dispatch(setSelectedTaskIds([]));
        reset();
        setIsCreateTaskDrawerOpen(false);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      try {
        setIsLoading(true);
        await patchCreateTask({
          body: payload,
          id: selectedTaskIds && selectedTaskIds[0],
        }).unwrap();
        enqueueSnackbar('Task Updated Successfully', {
          variant: 'success',
        });
        setIsLoading(false);
        dispatch(setSelectedTaskIds([]));
        reset();
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
    reset,
    postTaskLoading,
    patchTaskLoading,
    form,
    getDynamicFieldsStatus,
  };
};

export default useCreateTask;
