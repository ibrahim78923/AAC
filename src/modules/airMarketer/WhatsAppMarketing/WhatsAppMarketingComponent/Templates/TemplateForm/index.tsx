import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';

import { BackArrIcon } from '@/assets/icons';

import {
  createTemplateDefaultValues,
  createTemplateFiltersDataArray,
  createTemplateValidationSchema,
} from './TemplateForm.data';

import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

const TemplateForm = ({ handelSwitch }: any) => {
  const methodsNewsAndEventsFilters = useForm({
    resolver: yupResolver(createTemplateValidationSchema),
    defaultValues: createTemplateDefaultValues,
  });
  const onSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('file', values.attachment);
  };
  const { handleSubmit } = methodsNewsAndEventsFilters;

  const getFormValues = createTemplateFiltersDataArray();

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          sx={{
            minWidth: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: '0px ',
          }}
          onClick={() => handelSwitch(true)}
        >
          <BackArrIcon />
        </Button>
        <Typography variant="h3">Create Template</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <>
            <FormProvider
              methods={methodsNewsAndEventsFilters}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                {getFormValues?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select
                        ? item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : null}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="h3">Create Template</Typography>
            <Typography variant="body1">
              Your preview will appear here{' '}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ background: '#EBECF1', height: '243px', mb: 2 }}></Box>
              <Box
                sx={{
                  background: '#EBECF1',
                  width: '109px',
                  height: '10px',
                  borderRadius: '30px',
                  mb: 3,
                }}
              ></Box>

              <Box
                sx={{
                  background: '#EBECF1',
                  width: '70%',
                  height: '10px',
                  borderRadius: '30px',
                  mb: 1,
                }}
              ></Box>
              <Box
                sx={{
                  background: '#EBECF1',
                  width: '50%',
                  height: '10px',
                  borderRadius: '30px',
                  mb: 1,
                }}
              ></Box>
              <Box
                sx={{
                  background: '#EBECF1',
                  width: '60%',
                  height: '10px',
                  borderRadius: '30px',
                  mb: 1,
                }}
              ></Box>
            </Box>
          </Box>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateForm;
