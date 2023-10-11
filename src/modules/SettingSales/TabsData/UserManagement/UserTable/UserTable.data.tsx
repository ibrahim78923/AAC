import { Checkbox, Select, Switch, MenuItem } from '@mui/material';

import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  accountName: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().trim().required('Field is Required'),
  postCode: Yup.string().trim().required('Field is Required'),
  address: Yup.string(),
  buildingName: Yup.string().required('Field is Required'),
  unit: Yup.string().required('Field is Required'),
  buildingNumber: Yup.string(),
  streetName: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
});

export const defaultValues = {
  accountName: '',
  phoneNumber: '',
  postCode: '',
  address: '',
  unit: '',
  buildingName: '',
  buildingNumber: '',
  streetName: '',
  city: '',
  country: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'accountName',
      label: 'First Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNumber',
      label: 'Middle Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Last Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'buildingName',
      label: 'Phone Number',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'buildingNumber',
      label: 'Job Title',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'streetName',
      label: 'Assign role',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'United Kingdom', label: 'Account Admin' },
      { value: 'United Kingdom', label: 'Sales Manager' },
      { value: 'United Kingdom', label: 'Account Admin' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'city',
      label: 'Select Team',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'United Kingdom', label: 'Alfa' },
      { value: 'United Kingdom', label: 'Test' },
      { value: 'United Kingdom', label: 'Test 1' },
      { value: 'United Kingdom', label: 'Orcalo' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'city',
      label: 'Language',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'United Kingdom', label: 'English' },
      { value: 'United Kingdom', label: 'Spanish' },
      { value: 'United Kingdom', label: 'Chinese' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'city',
      label: 'Time Zone',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'United Kingdom', label: '(GMT-11:00) London' },
      { value: 'United Kingdom', label: '(GMT-11:00) London' },
      { value: 'United Kingdom', label: '(GMT-11:00) London' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'country',
      label: 'Facebook URL',
      fullWidth: true,
      select: false,
    },
    options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'country',
      label: 'Linkdin URL',
      fullWidth: true,
      select: false,
    },
    options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'country',
      label: 'Twitter URL',
      fullWidth: true,
      select: false,
    },
    options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
    component: RHFTextField,
    md: 12,
  },
];

export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.name,
    id: 'name',
    cell: (info: any) => info.getValue(),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.team,
    id: 'team',
    isSortable: true,
    header: 'Team',
    cell: (info: any) => (
      <Select
        variant="standard"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value="Alfa"
        // onChange={handleChange}
        label="Select"
        name={info.getValue()}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    ),
  },
  {
    accessorFn: (row: any) => row.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => (
      <Select
        variant="standard"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value="Alfa"
        // onChange={handleChange}
        label="Select"
        name={info.getValue()}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    ),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => <Switch color="primary" name={info.getValue()} />,
  },
];
