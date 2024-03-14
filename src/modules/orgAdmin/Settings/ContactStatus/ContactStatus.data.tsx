import { Box } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

import * as Yup from 'yup';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SETTINGS_CONTACT_STATUS_PERMISSIONS } from '@/constants/permission-keys';

export const ContactStatusvalidationSchema: any = Yup.object().shape({
  name: Yup.string()
    .required('Field is Required')
    .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed in this field'),
  description: Yup.string().required('Field is Required'),
});

export const ContactStatusDefaultValues = {
  name: '',
  description: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Add Status Name',
      fullWidth: true,
      disable: true,
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
export const ContactStatusTableData: any = [
  {
    Id: 1,
    name: `New`,
    Description: 'new stage',
    createdDate: '12/01/2023',
    action: 'action',
  },
  {
    Id: 2,
    name: `Open `,
    Description: 'open stage',
    createdDate: '12/02/2023',
    action: 'action',
  },

  {
    Id: 3,
    name: `Inprogress`,
    Description: 'in progress stage',
    createdDate: '23/12/2022',
    action: 'action',
  },
];

export const columns = (
  handleDeleteRecord: any,
  setIsModalHeading: any,
  handleEditClick: any,
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
      header: 'Status Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => (
        <Box
          dangerouslySetInnerHTML={{ __html: info?.row?.original?.description }}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <PermissionsGuard
          permissions={[ORG_ADMIN_SETTINGS_CONTACT_STATUS_PERMISSIONS?.ACTIONS]}
        >
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleEditClick(info?.row?.original);
                setIsModalHeading('View');
              }}
            >
              <ViewEyeIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleEditClick(info?.row?.original);
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
        </PermissionsGuard>
      ),
    },
  ];
};
