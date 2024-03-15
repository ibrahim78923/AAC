import { Box } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

import * as Yup from 'yup';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES_PERMISSIONS } from '@/constants/permission-keys';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const LifeCycleStagevalidationSchema: any = Yup.object().shape({
  name: Yup.string()
    .required('Field is Required')
    .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed in this field'),
  description: Yup.string().required('Field is Required'),
});

export const LifeCycleStageDefaultValues = {
  name: '',
  description: '',
};

export const dataArray = (isModalHeading: any) => {
  return [
    {
      componentProps: {
        name: 'name',
        label: 'Add stage name',
        fullWidth: true,
        disabled: isModalHeading === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        disabled: isModalHeading === 'View',
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};

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
  setIsModalHeading: any,
  handleDeleteRecord: any,
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
      header: 'Stage Name',
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
      cell: (info: any) => dayjs(info.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <PermissionsGuard
          permissions={[
            ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES_PERMISSIONS?.ACTIONS,
          ]}
        >
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleEditClick(info?.row?.original);
                setIsDraweropen(true);
                setIsModalHeading('View');
              }}
            >
              <ViewEyeIcon />
            </Box>
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
        </PermissionsGuard>
      ),
    },
  ];
};
