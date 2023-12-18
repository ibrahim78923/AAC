import { DocumentIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
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
  {
    id: 1754,
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
    id: 7453,
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
    id: 7881,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    currentAmount: 'PKR 09.00',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: false,
    upGradable: false,
  },
  {
    id: 6781,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    currentAmount: 'PKR 09.00',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: true,
    upGradable: true,
  },
];
export const assignedPhysicalGiftCardColumnsFunction = (
  router: any,
  assignedPhysicalGiftCardData: any,
  setAssignedPhysicalGiftCardData: any,
  assignedPhysicaldata: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!assignedPhysicalGiftCardData?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setAssignedPhysicalGiftCardData([
                ...assignedPhysicalGiftCardData,
                assignedPhysicaldata?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setAssignedPhysicalGiftCardData(
                assignedPhysicalGiftCardData?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={
          assignedPhysicalGiftCardData?.length === assignedPhysicaldata?.length
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setAssignedPhysicalGiftCardData([...assignedPhysicaldata])
            : setAssignedPhysicalGiftCardData([]);
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
        onClick={() =>
          router?.push({
            pathname: '',
            query: {
              assignedId: info?.row?.id,
            },
          })
        }
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
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: () => <DocumentIcon />,
  },
];
