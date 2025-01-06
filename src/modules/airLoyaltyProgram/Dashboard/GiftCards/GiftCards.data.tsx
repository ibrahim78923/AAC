import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { ACTIVITY_STATUS_MENU } from '@/constants';
import { Box } from '@mui/material';

const MenuItemDataArray = [
  { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
  { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
];

export const getGiftCardsColumns = (
  handleCardNumberClick: (giftCardNumber: string) => void,
) => [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    header: 'Card Number',
    isSortable: true,
    cell: (info: any) => (
      <Box onClick={() => handleCardNumberClick(info?.getValue())}>
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.totalAmount,
    id: 'totalAmount',
    header: 'Total Amount',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: true,
    cell: (info: any) => {
      const status = info.getValue()?.toUpperCase();

      return (
        <ActivityStatusMenu
          info={info}
          activityStatus={status}
          menuItemDataArray={MenuItemDataArray}
        />
      );
    },
  },
];
