import React from 'react';
import DrawerComp from '../Drawer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, MenuItem, useTheme, Typography } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import {
  createTaskData,
  createTaskDefaultValues,
  createTaskValidationSchema,
} from '../Task.data';
import { CreateTaskI } from './CreateTask.interface';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { usePostCreateTaskMutation } from '@/services/airSales/task';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const CreateTask = ({ title, hideBtn, defaultOpen }: CreateTaskI) => {
  const theme = useTheme();
  const [postCreateTask] = usePostCreateTaskMutation();

  const methodsFilter: any = useForm({
    resolver: yupResolver(createTaskValidationSchema),
    defaultValues: createTaskDefaultValues,
  });
  const { handleSubmit: handleMethodFilter } = methodsFilter;

  const onSubmitHandler = async (values: any) => {
    try {
      await postCreateTask({
        body: {
          ...values,
          dueDate: dayjs(values?.dueDate).format(DATE_FORMAT.API),
          time: '00:00',
        },
      }).unwrap();
      enqueueSnackbar('Task Created Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitHandler);
  return (
    <DrawerComp
      color="primary"
      defaultOpen={defaultOpen}
      title={title ?? 'Create Task'}
      isOk
      okText={title ? 'Update' : 'Create Task'}
      btnIcon={<AddCircleIcon />}
      btnVariant="contained"
      btnTitle="Create Task"
      hideBtn={hideBtn}
      submitHandler={() => handleFiltersSubmit(onSubmitHandler)}
      footer
    >
      <FormProvider
        methods={methodsFilter}
        handleSubmit={() => handleFiltersSubmit(onSubmitHandler)}
      >
        <Grid container spacing={2}>
          {createTaskData.map((obj) => (
            <Grid item key={uuid4()} md={obj?.gridLength} xs={12}>
              <Typography
                mb={'5px'}
                fontSize={'14px'}
                fontWeight={500}
                sx={{
                  color: theme?.palette?.grey[600],
                  '& .symbol': { color: theme?.palette?.error['light'] },
                }}
              >
                {obj?.title}
                <span className="symbol">{obj.symbol}</span>
              </Typography>
              <obj.component
                size={'small'}
                InputProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj.options?.map((option) => (
                      <MenuItem key={uuid4()} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))
                  : null}
              </obj.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </DrawerComp>
  );
};

export default CreateTask;
