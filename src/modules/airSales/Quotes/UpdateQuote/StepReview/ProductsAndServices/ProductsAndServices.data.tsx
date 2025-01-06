import { indexNumbers } from '@/constants';
import { capitalizeFirstLetters } from '@/utils';

export const columns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => capitalizeFirstLetters(info?.getValue()),
    header: 'Product Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => <>£{info?.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.additionalQuantity,
    id: 'additionalQuantity',
    isSortable: true,
    header: 'Additional Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.unitDiscount,
    id: 'unitDiscount',
    isSortable: true,
    header: 'Unit Discount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.total,
    id: 'total',
    isSortable: true,
    header: 'Total Additional Price',
    cell: (info: any) =>
      info?.row?.original?.additionalQuantity !== indexNumbers?.ZERO
        ? `£ ${
            info?.row?.original?.unitPrice *
              info?.row?.original?.additionalQuantity -
            info?.row?.original?.additionalQuantity *
              info?.row?.original?.unitDiscount
          }`
        : `£0`,
  },
];
