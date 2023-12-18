import { Checkbox, Select, Switch, MenuItem } from '@mui/material';

import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  firstName: Yup?.string()?.required('Field is Required'),
  middleName: Yup?.string()?.required('Field is Required'),
  lastName: Yup?.string()?.required('Field is Required'),
  email: Yup?.string()?.trim()?.required('Field is Required'),
  team: Yup?.string()?.trim()?.required('Field is Required'),
  address: Yup?.string(),
  phoneNumber: Yup?.string()?.required('Field is Required'),
  jobTitle: Yup?.string(),
  assignRole: Yup?.string(),
  faceBookUrl: Yup?.string(),
  country: Yup?.string(),
});

export const defaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  assignRole: '',
  team: '',
  country: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastName',
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
      name: 'phoneNumber',
      label: 'Phone Number',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assignRole',
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
      name: 'team',
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
      name: 'language',
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
      name: 'timeZone',
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
      name: 'facwBookUrl',
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
      name: 'linkdINuRL',
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
      name: 'TWITTERuRL',
      label: 'Twitter URL',
      fullWidth: true,
      select: false,
    },
    options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
    component: RHFTextField,
    md: 12,
  },
];

export const columnsUser = (
  handleTeam: any,
  handleRole: any,
  team: any,
  role: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.team,
      id: 'team',
      isSortable: true,
      header: 'Team',
      cell: (info: any) => (
        <Select
          variant="standard"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={team}
          onChange={handleTeam}
          label="Select"
          name={info.getValue()}
        >
          <MenuItem value="Alfa">Alfa</MenuItem>
          <MenuItem value="Alfa">Alfa</MenuItem>
          <MenuItem value="Alfa">Alfa</MenuItem>
        </Select>
      ),
    },
    {
      accessorFn: (row: any) => row?.role,
      id: 'role',
      isSortable: true,
      header: 'Role',
      cell: (info: any) => (
        <Select
          variant="standard"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={role}
          onChange={handleRole}
          label="Select"
          name={info.getValue()}
        >
          <MenuItem value="Team">Team</MenuItem>
          <MenuItem value="Team">Team</MenuItem>
          <MenuItem value="Team">Team</MenuItem>
        </Select>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <Switch color="primary" name={info?.getValue()} />,
    },
  ];
};
