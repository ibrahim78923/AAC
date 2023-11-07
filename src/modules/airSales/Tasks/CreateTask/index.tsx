import React from 'react';
import DrawerComp from '../Drawer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, MenuItem, useTheme, Typography } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import { useTask } from '../useTask';
import { createTaskData } from '../Task.data';
import { CreateTaskI } from './CreateTask.interface';

const CreateTask = ({ title, hideBtn, defaultOpen }: CreateTaskI) => {
  const theme = useTheme();
  const { createTaskSubmit, createTaskHandleSubmit, createTaskMethods } =
    useTask();

  return (
    <DrawerComp
      defaultOpen={defaultOpen}
      title={title ?? 'Create Task'}
      isOk
      okText={title ? 'Update' : 'Create Task'}
      btnIcon={<AddCircleIcon />}
      btnVariant="contained"
      btnTitle="Create Task"
      hideBtn={hideBtn}
      footer
    >
      <FormProvider
        methods={createTaskMethods}
        handleSubmit={createTaskHandleSubmit(createTaskSubmit)}
      >
        <Grid container spacing={2}>
          {createTaskData.map((obj) => (
            <Grid item key={uuid4()} md={obj?.gridLength} xs={12}>
              <Typography
                mb={'5px'}
                fontSize={'14px'}
                fontWeight={500}
                sx={{
                  color: theme.palette.grey[600],
                  '& .symbol': { color: theme?.palette.error['light'] },
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
                {obj?.componentProps.select
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
