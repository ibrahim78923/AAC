import { Box, Checkbox } from '@mui/material';

import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { SwitchBtn } from '@/components/SwitchButton';
import useTeams from '../Teams/useTeams';
import useUsers from './useUsers';

export const userValidationSchema = Yup?.object()?.shape({
  firstName: Yup?.string()
    ?.required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  lastName: Yup?.string()
    ?.required('Field is Required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    ),
  email: Yup?.string()?.trim()?.required('Field is Required'),
  address: Yup?.string()?.trim()?.required('Field is Required'),
  team: Yup?.string()?.trim()?.required('Field is Required'),
  role: Yup?.string()?.trim()?.required('Field is Required'),
  facebookUrl: Yup.string()
    .url('Please enter a valid URL starting with http://')
    .optional(),
  twitterUrl: Yup.string()
    .url('Please enter a valid URL starting with http://')
    .optional(),
  linkedInUrl: Yup.string()
    .url('Please enter a valid URL starting with http://')
    .optional(),
});

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
        required: true,
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        required: true,
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
        required: true,
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
        required: true,
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
        required: true,
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
        required: true,
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
        name: 'facebookUrl',
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
        name: 'linkedInUrl',
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

export const columnsUser = (
  checkedUser: any,
  setCheckedUser: any,
  updateUserLoading: any,
  tableData: any,
) => {
  const { handleUpdateStatus } = useUsers();

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedUser([...checkedUser, id]);
    } else {
      setCheckedUser(checkedUser?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedUser(checked ? tableData?.map(({ _id }: any) => _id) : []);
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedUser?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectCompaniesById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllCompanies(target.checked);
          }}
          checked={
            tableData?.length && checkedUser?.length === tableData?.length
          }
        />
      ),
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
        <Box>
          {updateUserLoading ? (
            <Box>Loading...</Box>
          ) : (
            <SwitchBtn
              defaultChecked={
                info?.row?.original?.status === 'ACTIVE' ? true : false
              }
              name={info?.getValue()}
              handleSwitchChange={(val: any) =>
                handleUpdateStatus(info?.row?.original?._id, val)
              }
            />
          )}
        </Box>
      ),
    },
  ];
};
