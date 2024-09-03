import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import * as Yup from 'yup';
import { VALIDATION_CONSTANT } from '@/constants';

export const validationSchema = Yup?.object()?.shape({
  email: Yup?.string()
    ?.email('Invalid email format')
    ?.required('Email is required')
    ?.trim(),
  profilePicture: Yup?.mixed()?.nullable(),
  firstName: Yup?.string()?.trim(),
  lastName: Yup?.string()?.trim(),
  address: Yup?.string()?.trim(),
  dateOfBirth: Yup?.date()?.nullable(),
  phoneNumber: Yup?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  whatsAppNumber: Yup?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  jobTitle: Yup?.string()?.trim(),
  dateOfJoining: Yup?.date()?.nullable(),
  contactOwnerId: Yup?.mixed()?.nullable(),
  lifeCycleStageId: Yup?.mixed()?.nullable(),
  statusId: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  email: '',
  profilePicture: null,
  firstName: '',
  lastName: '',
  address: '',
  dateOfBirth: null,
  phoneNumber: '',
  whatsAppNumber: '',
  jobTitle: '',
  dateOfJoining: null,
  contactOwnerId: null,
  lifeCycleStageId: null,
  statusId: null,
};

export const TYPE_VALUES = {
  NEW_CONTACT: 'newContact',
  EXISTING_CONTACT: 'existingContact',
};

export const getAssociateContactsColumns: any = ({
  theme,
  setModalId,
}: any) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      header: 'Contact ID',
      cell: (info: any) => `#PBR - ${info?.getValue()?.slice(-3)}`,
    },
    {
      accessorFn: (row: any) => row,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => (
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Avatar
            sx={{ bgcolor: theme?.palette?.blue?.main, width: 28, height: 28 }}
            src={generateImage(info?.getValue()?.profilePicture?.url)}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(
                info?.getValue()?.firstName,
                info?.getValue()?.lastName,
              )}
            </Typography>
          </Avatar>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="body2">
              {fullName(
                info?.getValue()?.firstName,
                info?.getValue()?.lastName,
              )}
            </Typography>
            {info?.getValue()?.email}
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.jobTitle,
      id: 'jobTitle',
      isSortable: true,
      header: 'Job Title',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'Action',
      cell: (info: any) => {
        return (
          <Box display={'flex'} gap={1}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_CONTACT_DETAILS,
              ]}
            >
              <VisibilityRoundedIcon
                color={'secondary'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setModalId({
                    view: true,
                    delete: false,
                    id: info?.getValue(),
                  })
                }
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_CONTACT,
              ]}
            >
              <CancelIcon
                color={'error'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setModalId({
                    view: false,
                    delete: true,
                    id: info?.getValue(),
                  })
                }
              />
            </PermissionsGuard>
          </Box>
        );
      },
    },
  ];
};
