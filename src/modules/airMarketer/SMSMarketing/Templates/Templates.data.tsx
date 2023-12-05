import { Box } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';

import * as Yup from 'yup';

export const TemplatesvalidationSchema: any = Yup.object().shape({
  name: Yup.string()
    .required('Field is Required')
    .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed in this field'),
  description: Yup.string().required('Field is Required'),
});

export const TemplatesDefaultValues = {
  name: '',
  description: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
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
export const TemplatesTableData: any = [
  {
    Id: 1,
    name: `Subscriber`,
    Description: 'Subscriber',
    CompaniesUsage: '8',
    Category: '8',
    createdDate: '12/01/2023',
    action: 'action',
  },
  {
    Id: 2,
    name: `Lead`,
    Description: 'Lead',
    CompaniesUsage: '0',
    Category: '0',
    createdDate: '12/02/2023',
    action: 'action',
  },

  {
    Id: 3,
    name: `Customer`,
    Description: 'Customer',
    CompaniesUsage: '3',
    Category: '3',
    createdDate: '23/12/2022',
    action: 'action',
  },
];

export const columns = (
  setIsModalHeading: any,
  handleDeleteRecord: any,
  handleEditClick: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info.getValue(),
      header: 'Template Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.Description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.Category,
      id: 'Category',
      isSortable: true,
      header: 'Category',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'createdDate',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleEditClick(info?.row?.original);
              setIsModalHeading('Edit');
            }}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleDeleteRecord(info?.row?.original?._id)}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
