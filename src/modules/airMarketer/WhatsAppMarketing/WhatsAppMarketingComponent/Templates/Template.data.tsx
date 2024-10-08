import { DeleteIcon, EditBlackIcon } from '@/assets/icons';
import { DATE_FORMAT, TASK_TYPE } from '@/constants';
import { AIR_MARKETER_SMS_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import { SMS_BROADCAST_CONSTANTS } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { capitalizeFirstLetter } from '@/utils/api';
import { Box, useTheme, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export const columns = ({ setDeleteTemplateModal }: any) => {
  const theme = useTheme();
  const navigate = useRouter();
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
      cell: (info: any) => (
        <Typography
          variant="body3"
          color={
            info?.getValue() === SMS_BROADCAST_CONSTANTS?.APPROVED
              ? theme?.palette?.primary?.main
              : info?.getValue() === SMS_BROADCAST_CONSTANTS?.REJECTED
                ? theme?.palette?.error?.main
                : theme?.palette?.warning?.main
          }
        >
          {info?.getValue() ? capitalizeFirstLetter(info?.getValue()) : 'N/A'}
        </Typography>
      ),
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <PermissionsGuard
            permissions={[AIR_MARKETER_SMS_MARKETING_PERMISSIONS.EDIT_TEMPLATE]}
          >
            <Box
              sx={{
                cursor: 'pointer',
                background: theme?.palette?.grey?.[400],
                padding: '5px',
                borderRadius: '50%',
              }}
              onClick={() =>
                navigate?.push({
                  pathname: AIR_MARKETER?.WHATSAPP_MARKETING_CREATE_TEMPLATE,
                  query: {
                    editData: JSON?.stringify(info?.row?.original),
                    type: TASK_TYPE?.EDIT_TASK,
                  },
                })
              }
            >
              <EditBlackIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_SMS_MARKETING_PERMISSIONS.DELETE_TEMPLATE,
            ]}
          >
            <Box
              sx={{
                cursor: 'pointer',
                background: theme?.palette?.grey?.[400],
                padding: '5px',
                borderRadius: '50%',
              }}
              onClick={() => {
                setDeleteTemplateModal({
                  isOpen: true,
                  id: info?.row?.original?.sid,
                });
              }}
            >
              <DeleteIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
      header: 'Actions',
      isSortable: false,
    },
  ];
};
