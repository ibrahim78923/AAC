import { Box, Stack } from '@mui/material';
import { styles } from './StepLineItems.style';
import { EditYellowBgIcon, ViewEyeIcon, TrashIcon } from '@/assets/icons';
import { AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const tableColumns: any = [
  {
    accessorFn: (row: any) => row?.productName,
    id: 'productName',
    cell: (info: any) => info?.getValue(),
    header: 'Product Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => <>£ {info?.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => <Box sx={styles?.cellChip}>{info?.getValue()}</Box>,
  },
  {
    accessorFn: (row: any) => row?.unitDiscount,
    id: 'unitDiscount',
    isSortable: true,
    header: 'Unit Discount',
    cell: (info: any) => (
      <Stack direction={'row'} gap="6px">
        <Box sx={styles?.cellChip}>{info?.getValue()}</Box>
        <Box sx={styles?.cellChip}>
          {info?.row?.original?.discount}{' '}
          {info?.getValue() === '%' ? '%' : null}
        </Box>
      </Stack>
    ),
  },
  {
    accessorFn: (row: any) => row?.totalPrice,
    id: 'totalPrice',
    isSortable: true,
    header: 'Total Price',
    cell: (info: any) => <>£ {info?.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row?.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Stack direction="row" gap="8px">
        <Box sx={styles?.actionBtn}>
          <ViewEyeIcon />
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.EDIT_PRODUCT,
          ]}
        >
          <Box sx={styles?.actionBtn}>
            <EditYellowBgIcon />
          </Box>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.DELETE_PRODUCT,
          ]}
        >
          <Box sx={styles?.actionBtn}>
            <TrashIcon />
          </Box>
        </PermissionsGuard>
      </Stack>
    ),
  },
];
