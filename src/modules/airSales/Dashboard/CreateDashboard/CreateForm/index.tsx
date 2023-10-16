import React from 'react';

import { Grid, Box, Autocomplete, TextField } from '@mui/material';

import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import {
  dataArray,
  defaultValues,
  userAndTeams,
  validationSchema,
} from './CreateForm.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

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
            <Grid
              item
              xs={12}
              md={item?.md}
              key={uuidv4()}
              style={{ paddingTop: '10px' }}
            >
              {item.componentProps.name === 'accessDashboard' ? (
                <Box>
                  <item.component {...item.componentProps} size="small">
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option value={option.value} key={uuidv4()}>
                          {option.label}
                        </option>
                      ))}
                  </item.component>
                  {watchFields[0] === 'Only special user and teams' && (
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={userAndTeams}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="users" />
                      )}
                    />
                  )}
                  {watchFields[0] === 'Everyone' && (
                    <RHFRadioGroup
                      options={['View and edit', 'View Only']}
                      name="viewAndEdit"
                      label=""
                    />
                  )}
                </Box>
              ) : (
                <item.component {...item.componentProps} size="small" />
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
export default CreateForm;
