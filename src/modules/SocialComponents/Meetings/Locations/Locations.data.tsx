import { Box } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { TruncateText } from '@/components/TruncateText';

export const locationsListColumnsDynamic: any = (setIsPortalOpen: any) => [
  {
    accessorFn: (row: any) => row?.locationName,
    id: 'locationName',
    isSortable: true,
    header: 'Location Name',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.destination,
    id: 'destination',
    isSortable: true,
    header: 'Destination',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setIsPortalOpen({
              isOpen: true,
              isEdit: true,
              isUpsert: true,
              data: info?.row?.original,
              type: GENERIC_UPSERT_FORM_CONSTANT?.EDIT,
            })
          }
        >
          <EditPenIcon />
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setIsPortalOpen({
              isOpen: true,
              isDelete: true,
              data: info?.row?.original,
            })
          }
        >
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
