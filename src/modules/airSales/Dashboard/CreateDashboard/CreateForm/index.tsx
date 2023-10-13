import React from 'react';
import { Grid, Box } from '@mui/material';

import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import { dataArray, defaultValues, validationSchema } from './CreateForm.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

const CreateForm = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, watch } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Dashboard Created Successfully', {
      variant: 'success',
    });
  };

  const watchFields = watch(['accessDashboard']);
  return (
    <Box mt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {dataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item.componentProps.name === 'accessDashboard' &&
              (watchFields[0] === 'Everyone' ||
                watchFields[0] === 'Only special user and teams') ? (
                <Box>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option value={option?.value} key={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                  <RHFRadioGroup
                    options={['View and edit', 'View Only']}
                    name={'viewAndEdit'}
                    label={''}
                  />
                </Box>
              ) : (
                <item.component
                  {...item.componentProps}
                  size={'small'}
                ></item.component>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
export default CreateForm;
