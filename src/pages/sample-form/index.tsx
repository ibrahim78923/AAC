import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Box, CircularProgress, Grid } from '@mui/material';
import {
  FormProvider,
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';

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

// phone number validation regX
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// static data (sample)
const shiftOptions = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];
// static data (sample)
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

// form validation schema
const validationSchema: any = yup.object().shape({
  name: yup.string().required('Required field!'),
  email: yup.string().email().required('Required field!'),
  contact: yup
    .string()
    .required('Required field!')
    .matches(phoneRegExp, 'Phone number is not valid'),
  age: yup.string().required('Required field!'),
  gender: yup.string().required('Required field!'),
  shift: yup.string().required('Required field!'),
  description: yup.string(),
  dob: yup.date().typeError('Required field!').required('Required field!'),
  timeFrom: yup.date().typeError('Required field!').required('Required field!'),
  timeTo: yup.date().typeError('Required field!').required('Required field!'),
  rememberMe: yup.boolean().oneOf([true], 'Required field!'),
  editor: yup.string().required('Required field!'),
  switch: yup.boolean(),
});

const SampleForm = () => {
  const defaultValues = {
    name: '',
    email: '',
    contact: '',
    age: '',
    gender: '',
    shift: '',
    description: '',
    dob: null,
    timeFrom: null,
    timeTo: null,
    rememberMe: true,
    editor: '',
    switch: true,
  };

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

  // convert time string to to datetime format in case update case
  const handleSetTime = (value: string) => {
    const [hours, minutes, seconds] = value.split(':');
    const newTime = new Date();
    newTime.setHours(+hours);
    newTime.setMinutes(+minutes);
    newTime.setSeconds(+seconds);
    return newTime;
  };

  // static values for update functionality to setForm data
  const values = {
    name: 'test',
    email: 'test@gmail.com',
    contact: 123456789,
    age: 26,
    shift: 'evening',
    description: 'description',
    gender: 'female',
    rememberMe: true,
    dob: dayjs(new Date('2023-09-12')),
    timeFrom: handleSetTime('02:09:00'),
    timeTo: handleSetTime('03:09:00'),
    editor: '<p>some random text </p><br/><h1>Hello Editor</h1>',
    switch: false,
  };

  // setForm data in case of update,
  // Note this is just for sample form in real scenario this code will be placed in uesEffect hook
  const handleSetValues = () => {
    Object.entries(values).map(([key, value]) => setValue(key, value));
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(submit)}
      style={formWrapperStyle}
    >
      <Typography variant="h3">Sample Form</Typography>
      <Box>
        <RHFTextField
          name="name"
          size="small"
          placeholder="Name"
          label="name"
          required
        />
      </Box>
      <Box>
        <RHFTextField
          name="email"
          size="small"
          placeholder="Email"
          label="Email"
          required
        />
      </Box>
      <Box>
        <RHFTextField
          name="contact"
          size="small"
          placeholder="Contact"
          label="Contact"
          required
        />
      </Box>
      <Box>
        <RHFTextField
          name="age"
          size="small"
          type="number"
          placeholder="Age"
          label="Age"
          required
        />
      </Box>
      <Box>
        <RHFSelect
          name="shift"
          placeholder="Shift"
          size="small"
          label="Shift"
          required
        >
          {shiftOptions?.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </RHFSelect>
      </Box>
      <Box>
        <RHFTextField
          name="description"
          size="small"
          multiline={true}
          minRows={3}
          fullWidth={true}
          placeholder="descrption"
          label="Description"
        />
      </Box>
      <Box>
        <RHFDatePicker
          name="dob"
          title="Date Uploaded"
          size="small"
          required
          label="Date of Birth"
          fullWidth
        />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <RHFTimePicker
            name="timeFrom"
            title="Time From"
            size="small"
            fullWidth
            required
            label="Time From"
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <RHFTimePicker
            name="timeTo"
            title="Time To"
            size="small"
            label="Time To"
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Box>
        <RHFRadioGroup
          name="gender"
          required
          options={genderOptions}
          label="gender"
        />
      </Box>
      <Box>
        <RHFCheckbox name="rememberMe" label="Remember Me" required />
      </Box>
      <Box>
        <RHFEditor name="editor" label="text editor" required />
      </Box>
      <Box>
        <RHFSwitch name="switch" label=" Dark Mode" />
      </Box>

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

export default SampleForm;
