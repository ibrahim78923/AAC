import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DeleteCrossIcon, EditYellowBGPenIcon, EyeIcon } from '@/assets/icons';
import { UserAvatarImage } from '@/assets/images';
import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AIR_CALL_CENTER_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

import { Box, Stack } from '@mui/material';
import * as Yup from 'yup';

export const jobPostingValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Field is Required'),
  jobType: Yup.string().trim().required('Field is Required'),
  jobCategory: Yup.string().trim().required('Field is Required'),
  experience: Yup.string().trim().required('Field is Required'),
  numberOfVacancy: Yup.string().trim().required('Field is Required'),
  deadline: Yup.date().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const jobPostingDefaultValues = {
  title: '',
  jobType: '',
  jobCategory: '',
  experience: '',
  numberOfVacancy: '',
  deadline: null,
  description: '',
};

export const jobPostingDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobType',
      label: 'Job Type',
      select: true,
      fullWidth: true,
    },
    options: [
      { value: 'FULL_TIME', label: 'Full Time' },
      { value: 'PART_TIME', label: 'Part Time' },
      { value: 'PERMANENT', label: 'Permanent' },
      { value: 'INTERNSHIP', label: 'Internship' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobCategory',
      label: 'Category ',
      select: true,
      fullWidth: true,
    },
    options: [
      { value: 'SALES', label: 'Sales' },
      { value: 'MARKETING', label: 'Marketing' },
      { value: 'SERVICES', label: 'Services' },
      { value: 'OPERATIONS', label: 'Operations' },
      { value: 'LOYALTY_PROGRAM', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'experience',
      label: 'Experience Level',
      select: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Urgent', label: 'Urgent' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'numberOfVacency',
      label: 'Number of Vacancy',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5 or more than 5' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'deadline',
      label: 'Application Deadline Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Job Discription',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const columns = (
  theme: any,
  setIsDeleteModal: any,
  handleOpenDrawerEditTeams: any,
  setIsTeamDrawerOpen: any,
) => {
  // const { handleUpdateStatus } = useJobPosting();

  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.teamAgent,
      id: 'teamAgent',
      isSortable: true,
      header: 'Team Member',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'action',
      cell: (
        <PermissionsGuard
          permissions={[
            AIR_CALL_CENTER_USER_MANAGEMENT_PERMISSIONS?.TEAMS_ACTION,
          ]}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsTeamDrawerOpen?.(true);
              }}
            >
              <EyeIcon color={theme?.palette?.blue?.main} />
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={handleOpenDrawerEditTeams}>
              <EditYellowBGPenIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsDeleteModal?.(true);
              }}
            >
              <DeleteCrossIcon />
            </Box>
          </Stack>
        </PermissionsGuard>
      ),
      header: 'Action',
      isSortable: true,
    },
  ];
};

export const usersMockData = [
  {
    _id: '1',
    name: 'test1',

    teamAgent: '4',
  },
  {
    _id: '2',
    name: 'test1',

    teamAgent: '4',
  },
  {
    _id: '3',
    name: 'test1',

    teamAgent: '4',
  },
];

export const memberDetails: any = [
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'abc@gmail.com',
    designation: 'Graphic Designer',
  },
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'abc@gmail.com',
    designation: 'Graphic Designer',
  },
];
