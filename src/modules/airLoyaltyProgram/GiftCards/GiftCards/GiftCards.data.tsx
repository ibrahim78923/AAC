import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { UserInfo } from '@/components/UserInfo';
import { ACTIVITY_STATUS_MENU } from '@/constants';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { uiDateFormat } from '@/lib/date-time';
import { fullNameInitial, truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

const MenuItemDataArray = [
  { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
  { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
];

export const giftCardColumnsFunction = (
  router: any,
  usePutGiftCardStatusMutation: any,
  handleGiftCard: any,
): any => [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() => {
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.GIFT_CARDS_DETAIL,
            query: {
              giftCardNumber: info?.getValue(),
            },
          });
        }}
        sx={{ cursor: 'pointer', color: 'black' }}
      >
        {truncateText(info?.getValue())}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.cardRecipient,
    id: 'cardRecipient',
    header: 'Card Recipient',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        name={info?.row?.original?.recipientName}
        email={info?.row?.original?.recipientEmail}
        nameInitial={fullNameInitial(info?.row?.original?.recipientName)}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.totalAmount,
    id: 'totalAmount',
    header: 'Total Amount',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue() ?? '---'),
  },
  {
    accessorFn: (row: any) => row?.spentamount,
    id: 'spentamount',
    isSortable: false,
    header: 'Spent Amount',
    cell: (info: any) => truncateText(info?.getValue() ?? '---'),
  },
  {
    accessorFn: (row: any) => row?.currentamount,
    id: 'currentamount',
    isSortable: false,
    header: 'Current Amount',
    cell: (info: any) => truncateText(info?.getValue() ?? '---'),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => uiDateFormat(info?.getValue()),
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
          apiQuery={usePutGiftCardStatusMutation()}
          patchParameterProps={(event: any) => ({
            queryParams: { cardNumber: info?.row?.original?.cardNumber },
            body: { status: event?.target?.value },
          })}
          refetchApi={handleGiftCard}
          hasPermission
        />
      );
    },
  },
];
