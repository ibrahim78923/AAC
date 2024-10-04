import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DeleteIcon } from '@/assets/icons';
import { DATE_FORMAT } from '@/constants';
import { AIR_MARKETER_SMS_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import { capitalizeFirstLetter } from '@/utils/api';
import { Button } from '@mui/material';
import dayjs from 'dayjs';

export const columns = ({ setDeleteTemplateModal }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'templateName',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()),
      header: 'Template Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.detail,
      id: 'description',
      isSortable: false,
      header: 'Description',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.approvalStatus,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) =>
        info?.getValue() ? capitalizeFirstLetter(info?.getValue()) : 'N/A',
    },
    {
      accessorFn: (row: any) => row?.category,
      id: 'category',
      isSortable: false,
      header: 'Category',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: false,
      header: 'Created Date',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => (
        <PermissionsGuard
          permissions={[AIR_MARKETER_SMS_MARKETING_PERMISSIONS.DELETE_TEMPLATE]}
        >
          <Button
            sx={{
              background: '',
              padding: '0',
              minWidth: '30px',
              height: '30px',
              borderRadius: '50%',
            }}
            onClick={() =>
              setDeleteTemplateModal({
                isOpen: true,
                id: info?.row?.original?._id,
              })
            }
          >
            <DeleteIcon />
          </Button>
        </PermissionsGuard>
      ),
      header: 'Actions',
      isSortable: false,
    },
  ];
};
