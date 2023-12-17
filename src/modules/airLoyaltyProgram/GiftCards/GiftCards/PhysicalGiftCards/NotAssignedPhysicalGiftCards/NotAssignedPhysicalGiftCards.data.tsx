import { DocumentIcon } from '@/assets/icons';
import { Box, Checkbox, Typography } from '@mui/material';

export const data: any = [
  {
    id: 6757,
    cardNumber: 'TVKP123451',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
  {
    id: 1745,
    cardNumber: 'TVKP123451',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
  {
    id: 1754,
    cardNumber: 'TVKP123451',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
  {
    id: 7453,
    cardNumber: 'TVKP123451',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
  {
    id: 7881,
    cardNumber: 'TVKP123451',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
  {
    id: 6781,
    cardNumber: 'TVKP123451',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    actions: 'Assign to',
  },
];
export const notAssignedPhysicalGiftCardColumnsFunction = (
  router: any,
  notAssignedPhysicalGiftCardData: any,
  setNotAssignedPhysicalGiftCardData: any,
  notAssignedPhysicaldata: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!notAssignedPhysicalGiftCardData?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setNotAssignedPhysicalGiftCardData([
                ...notAssignedPhysicalGiftCardData,
                notAssignedPhysicaldata?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setNotAssignedPhysicalGiftCardData(
                notAssignedPhysicalGiftCardData?.filter((item: any) => {
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
          notAssignedPhysicalGiftCardData?.length ===
          notAssignedPhysicaldata?.length
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setNotAssignedPhysicalGiftCardData([...notAssignedPhysicaldata])
            : setNotAssignedPhysicalGiftCardData([]);
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
      <Typography color={'black'}>{info?.getValue()}</Typography>
    ),
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
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: (info: any) => (
      <Box display={'flex'} justifyContent={'space-between'}>
        <DocumentIcon />
        <Typography
          onClick={() =>
            router?.push({
              pathname: '',
              query: {
                notAssignedId: info?.row?.id,
              },
            })
          }
          sx={{ cursor: 'pointer' }}
          color={'primary'}
        >
          {info?.row?.original?.actions}
        </Typography>
      </Box>
    ),
  },
];
