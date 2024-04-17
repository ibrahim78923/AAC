import { REQUESTORS_STATUS } from '@/constants/strings';
import { Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export const giftCardsData = [
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
];

export const giftCardsColumns = [
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.cardNo,
    id: 'cardNo',
    header: 'Card No',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.amount,
    id: 'amount',
    header: 'Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          backgroundColor:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.lighter'
              : 'custom.error_lighter',
          color:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.main'
              : 'error.main',
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={
              info?.getValue()?.toLowerCase() ===
              REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
                ? 'success'
                : 'error'
            }
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
];
