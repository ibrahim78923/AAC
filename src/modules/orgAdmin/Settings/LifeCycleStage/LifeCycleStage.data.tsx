import { Box } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

import * as Yup from 'yup';

export const LifeCycleStagevalidationSchema = Yup.object().shape({
  AddStageName: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required'),
});

export const LifeCycleStageDefaultValues = {
  AddStageName: '',
  description: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'AddStageName',
      label: 'Add stage name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

// table
export const LifeCycleStageTableData: any = [
  {
    Id: 1,
    name: `Subscriber`,
    Description: 'Subscriber',
    CompaniesUsage: '8',
    ContactUsage: '8',
    createdDate: '12/01/2023',
    action: 'action',
  },
  {
    Id: 2,
    name: `Lead`,
    Description: 'Lead',
    CompaniesUsage: '0',
    ContactUsage: '0',
    createdDate: '12/02/2023',
    action: 'action',
  },

  {
    Id: 3,
    name: `Customer`,
    Description: 'Customer',
    CompaniesUsage: '3',
    ContactUsage: '3',
    createdDate: '23/12/2022',
    action: 'action',
  },
];

export const columns = (
  setIsDraweropen: any,
  setIsOpenAlert: any,
  setIsModalHeading: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: () => <DragIndicatorIcon />,
      header: <></>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info.getValue(),
      header: 'Stage Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.Description,
      id: 'Description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.CompaniesUsage,
      id: 'CompaniesUsage ',
      isSortable: true,
      header: 'Companies Usage',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.ContactUsage,
      id: 'ContactUsage',
      isSortable: true,
      header: 'Contact Usage',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDraweropen(true);
              setIsModalHeading('View');
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDraweropen(true);
              setIsModalHeading('Edit');
            }}
          >
            <EditPenIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setIsOpenAlert(true)}>
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
