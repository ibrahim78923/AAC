import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import * as Yup from 'yup';
import { VALIDATION_CONSTANT } from '@/constants';
import { UserInfo } from '@/components/UserInfo';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';

export const validationSchema = Yup?.object()?.shape({
  email: Yup?.string()
    ?.email('Invalid email format')
    ?.required('Email is required')
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.EMAIL,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL}`,
    ),
  profilePicture: Yup?.mixed()?.nullable(),
  firstName: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  lastName: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  address: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.ADDRESS,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.ADDRESS}`,
    ),
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
  jobTitle: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
    ),
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

export const getAssociateContactsColumns: any = ({ setModalId }: any) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      header: 'Contact ID',
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          #PBR - {info?.getValue()?.slice(-3)}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => (
        <UserInfo
          nameInitial={fullNameInitial(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          name={fullName(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          avatarSrc={info?.getValue()?.profilePicture?.url}
          email={info?.getValue()?.email}
        />
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
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
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
