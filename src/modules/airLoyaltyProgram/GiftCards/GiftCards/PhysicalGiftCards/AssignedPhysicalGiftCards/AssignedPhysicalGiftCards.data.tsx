import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  DocumentIcon,
} from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import { Checkbox, Typography } from '@mui/material';

export const data: any = [
  {
    id: 6757,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    currentAmount: 'PKR 09.00',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: true,
    upGradable: true,
  },
  {
    id: 1745,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    currentAmount: 'PKR 09.00',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: false,
    upGradable: false,
  },
];
export const assignedPhysicalGiftCardColumnsFunction = (
  router: any,
  selectedAssignedPhysicalCards: any,
  setSelectedAssignedPhysicalCards: any,
  assignedPhysicaldata: any = [],
  overallPermissions: any = [],
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedAssignedPhysicalCards?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAssignedPhysicalCards([
                ...selectedAssignedPhysicalCards,
                assignedPhysicaldata?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedAssignedPhysicalCards(
                selectedAssignedPhysicalCards?.filter(
                  (item: any) => item?.id !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!assignedPhysicaldata?.length
            ? selectedAssignedPhysicalCards?.length ===
              assignedPhysicaldata?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAssignedPhysicalCards(
                assignedPhysicaldata?.map((item: any) => item),
              )
            : setSelectedAssignedPhysicalCards([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() => {
          if (
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.VIEW_GIFT_CARD_DETAILS
          )
            return;
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.SINGLE_GIFT_CARD_TRANSACTION_DETAIL,
            query: {
              giftCardId: info?.row?.id,
              type: 'physical',
              category: 'assigned',
            },
          });
        }}
        sx={{ cursor: 'pointer', color: 'black' }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.cardRecipient,
    id: 'cardRecipient',
    header: 'Card Recipient',
    isSortable: true,
    cell: (info: any) => (
      <Typography component="span">
        {info?.row?.original?.cardRecipient?.email}
        <br />
        {info?.row?.original?.cardRecipient?.name}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.totalAmount,
    id: 'totalAmount',
    header: 'Total Amount',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.currentAmount,
    id: 'currentAmount',
    isSortable: false,
    header: 'Current Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.shop,
    id: 'shop',
    header: 'Shop',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.active,
    id: 'active',
    header: 'Active',
    isSortable: true,
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.upGradable,
    id: 'upGradable',
    header: 'Up Gradable',
    isSortable: true,
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },

  ...(overallPermissions?.includes(
    AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.PRINT,
  )
    ? [
        {
          accessorFn: (row: any) => row?.actions,
          id: 'actions',
          isSortable: true,
          header: 'Actions',
          cell: () => <DocumentIcon />,
        },
      ]
    : []),
];
