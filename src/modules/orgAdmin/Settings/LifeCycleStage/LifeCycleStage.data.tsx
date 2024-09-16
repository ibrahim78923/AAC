import { Box } from '@mui/material';

import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

import * as Yup from 'yup';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES_PERMISSIONS } from '@/constants/permission-keys';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { DRAWER_ACTIONS_TITLES } from '@/constants/strings';
import { capitalizeFirstLetter } from '@/utils/api';
import { dynamicFormValidationSchema } from '@/utils/dynamic-forms';

export const LifeCycleStagevalidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    name: Yup?.string()
      ?.required('Field is Required')
      ?.matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed in this field'),
    description: Yup?.string()?.required('Field is Required'),
    ...formSchema,
  });
};

export const LifeCycleStageDefaultValues = {
  name: '',
  description: '',
};

export const dataArray = (isModalHeading: string) => {
  return [
    {
      componentProps: {
        name: 'name',
        label: 'Add stage name',
        disabled: isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW,
        placeholder: 'Enter stage name',
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter description...',
        required: true,
        disabled: isModalHeading === DRAWER_ACTIONS_TITLES?.VIEW,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};

export const columns = (
  setIsDraweropen: (value: boolean) => void,
  setIsModalHeading: (value: string) => void,
  handleDeleteRecord: (id: string) => void,
  handleEditClick: (id: string) => void,
) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => capitalizeFirstLetter(info.getValue()),
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
                setIsModalHeading(DRAWER_ACTIONS_TITLES?.VIEW);
              }}
            >
              <ViewEyeIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                handleEditClick(info?.row?.original);
                setIsModalHeading(DRAWER_ACTIONS_TITLES?.EDIT);
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
