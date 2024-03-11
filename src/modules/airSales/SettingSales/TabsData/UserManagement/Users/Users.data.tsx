import { Checkbox } from '@mui/material';

import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { SwitchBtn } from '@/components/SwitchButton';
import useTeams from '../Teams/useTeams';
import useUsers from './useUsers';

export const userValidationSchema = Yup?.object()?.shape({
  firstName: Yup?.string()?.required('Field is Required'),
  lastName: Yup?.string()?.required('Field is Required'),
  email: Yup?.string()?.trim()?.required('Field is Required'),
  team: Yup?.string()?.trim()?.required('Field is Required'),
  phoneNumber: Yup?.string()?.required('Field is Required'),
});

export const userDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  team: '',
  address: '',
  phoneNumber: '',
  jobTitle: '',
  role: '',
  facebookUrl: '',
  language: '',
  twitterUrl: '',
  linkedInUrl: '',
};

export const dataArray = () => {
  const { teamsData } = useTeams();
  const { rolesByCompanyId } = useUsers();
  return [
    {
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        fullWidth: true,
        placeholder: 'Enter First Name',
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'address',
        label: 'Address',
        placeholder: 'Enter Address',
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
        placeholder: 'Enter Email',
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter Phone Number',
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
        placeholder: 'Enter Job Title',
        fullWidth: true,
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'role',
        label: 'Assign role',
        fullWidth: true,
        select: true,
      },
      options: rolesByCompanyId?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
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
      options: teamsData?.data?.userTeams?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
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
        name: 'timezone',
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
        name: 'faceBookUrl',
        label: 'Facebook URL',
        placeholder: 'Enter Facebook URL',
        fullWidth: true,
        select: false,
      },
      options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'linkedInURL',
        label: 'Linkdin URL',
        placeholder: 'Enter LinkedIn URL',
        fullWidth: true,
        select: false,
      },
      options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'twitterUrl',
        label: 'Twitter URL',
        placeholder: 'Enter Twitter URL',
        fullWidth: true,
        select: false,
      },
      options: [{ value: 'United Kingdom', label: 'United Kingdom' }],
      component: RHFTextField,
      md: 12,
    },
  ];
};

export const columnsUser = (checkedUser: any, setCheckedUser: any) => {
  const handleCheckboxChange = (val: any, rowId: string) => {
    const recordId = val?.target?.checked ? rowId : null;
    setCheckedUser(recordId);
  };
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedUser === info?.row?.original?._id}
          onChange={(e: any) =>
            handleCheckboxChange(e, info?.row?.original?._id)
          }
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) =>
        `${row?.user?.firstName} ${row?.user?.lastName}`,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.user?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <SwitchBtn
          defaultChecked={info?.row?.original?.status}
          name={info?.getValue()}
        />
      ),
    },
  ];
};
