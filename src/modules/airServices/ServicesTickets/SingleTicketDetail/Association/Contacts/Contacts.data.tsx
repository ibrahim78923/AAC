import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

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
      cell: (info: any) => truncateText(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
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
      accessorFn: (row: any) => row?.associateAssetsDetails._id,
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
