import {
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as yup from 'yup';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

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
export const UpdationValues = {
  name: 'test',
  email: 'test@gmail.com',
  contact: 123456789,
  age: 26,
  shift: 'evening',
  description: 'description',
  gender: 'female',
  rememberMe: true,
  dob: new Date('2023-09-12'),
  timeFrom: handleSetTime('02:09:00'),
  timeTo: handleSetTime('03:09:00'),
  editor: '<p>some random text </p><br/><h1>Hello Editor</h1>',
  switch: false,
};

export const defaultValues = {
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

// phone number validation regX
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// form validation schema
export const validationSchema: any = yup.object().shape({
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

export const mappingFormDataFunction = () => [
  {
    id: 2,
    component: RHFTextField,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'name',
      label: 'name',
      required: true,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'email',
      label: 'email',
      required: true,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 922,
    componentProps: {
      fullWidth: true,
      name: 'contact',
      label: 'Contact',
      required: true,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 923,
    componentProps: {
      fullWidth: true,
      name: 'age',
      label: 'age',
      type: 'number',
      required: true,
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'shift',
      label: 'shift',
      select: true,
      options: dropdownDummy,
      required: true,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 100,
    componentProps: {
      name: 'description',
      multiline: true,
      minRows: 3,
      fullWidth: true,
      placeholder: 'descrption',
      label: 'Description',
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 97,
    componentProps: {
      fullWidth: true,
      name: 'dob',
      label: 'Date Of Birth',
      required: true,
    },
    gridLength: 12,
    component: RHFDatePicker,
  },
  {
    id: 9857,
    componentProps: {
      label: 'Time To',
      fullWidth: true,
      name: 'timeTo',
      required: true,
    },
    gridLength: 6,
    component: RHFTimePicker,
  },
  {
    id: 985,
    componentProps: {
      label: 'Time From',
      fullWidth: true,
      name: 'timeFrom',
      required: true,
    },
    gridLength: 6,
    component: RHFTimePicker,
  },
  {
    id: 82,
    component: RHFRadioGroup,
    gridLength: 12,
    componentProps: {
      name: 'gender',
      required: true,
      options: dropdownDummy,
      label: 'gender',
    },
  },
  {
    id: 90,
    componentProps: {
      name: 'rememberMe',
      label: 'Remember Me',
      required: true,
    },
    gridLength: 12,
    component: RHFCheckbox,
  },
  {
    id: 95,
    componentProps: {
      name: 'editor',
      label: 'text editor',
      required: true,
    },
    gridLength: 12,
    component: RHFEditor,
  },
  {
    id: 96,
    componentProps: {
      name: 'switch',
      label: ' Dark Mode',
    },
    gridLength: 12,
    component: RHFSwitch,
  },
];
