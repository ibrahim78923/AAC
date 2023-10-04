import React from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  mappingFormDataFunction,
  validationSchema,
  defaultValues,
  UpdationValues,
} from './MapForm.data';

const formWrapperStyle = {
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: 720,
  margin: '2rem auto',
  boxShadow: '0px 2.9px 32.79px rgba(0,0,0,0.06)',
  borderRadius: '1rem',
};

const MappingForm = () => {
  // react hook form methods
  const methods: any = useForm({
    resolver: yupResolver(validationSchema), // validator
    defaultValues, // initial form data , Note if not use form will be uncontrolled initially
  });

  const {
    reset, // reset form
    handleSubmit, // submit form
    setValue, // set form value in update case
    formState: { isSubmitting },
  } = methods;

  const submit = (data: any) => {
    data.dob = dayjs(data.dob).format('YYYY-MM-DD');
    data.timeFrom = dayjs(data.timeFrom).format('HH:MM:ss');
    data.timeTo = dayjs(data.timeTo).format('HH:MM:ss');
  };

  // setForm data in case of update,
  // Note this is just for sample form in real scenario this code will be placed in uesEffect hook
  const handleSetValues = () => {
    Object.entries(UpdationValues).map(([key, value]) => setValue(key, value));
  };

  const mappingFormData = mappingFormDataFunction();
  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(submit)}
      style={formWrapperStyle}
    >
      <Typography variant="h3">Mapped Sample Form</Typography>
      <Grid container rowSpacing={3.2} columnSpacing={2}>
        {mappingFormData?.map((form: any) => {
          return (
            <Grid item xs={12} md={form?.gridLength} key={form.id}>
              <form.component {...form.componentProps} size="small">
                {form?.componentProps?.select
                  ? form.componentProps.options.map((option: any) => (
                      <option key={option?.id} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : form?.heading
                  ? form?.heading
                  : null}
              </form.component>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={reset} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSetValues} variant="outlined">
          Update
        </Button>
        <Button type="submit" variant="contained">
          {isSubmitting && (
            <span
              style={{
                color: 'white',
                marginTop: '0.5rem',
                position: 'absolute',
              }}
            >
              <CircularProgress
                size={20}
                color="inherit"
                thickness={4}
                className="white-color"
              />
            </span>
          )}
          Submit
        </Button>
      </Box>
    </FormProvider>
  );
};

export default MappingForm;
