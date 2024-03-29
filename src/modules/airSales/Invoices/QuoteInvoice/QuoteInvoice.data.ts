import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

// products table data
export const productsTableColumns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'productName',
    cell: (info: any) => info?.getValue(),
    header: 'Product Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: ({ _id }: { _id: string }) => _id,
    id: 'totalPrice',
    isSortable: true,
    header: 'Total Price',
    cell: ({ row: { original } }: any) =>
      `£${original?.unitPrice * original?.quantity}`,
  },
];

export const getDataArray = (QuoteData: any) => {
  return [
    {
      id: 1,
      componentProps: {
        name: 'Quote',
        label: 'Select Quote (Please select Quote)',
        fullWidth: true,
        apiQuery: QuoteData,
        required: true,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};

export const productTotalDetails = [
  {
    title: 'Subtotal',
    value: '£75',
    detail: [
      { title: 'Tax', value: '20%' },
      { title: 'Unit Discount', value: '30 GBP' },
    ],
  },
];

export const sendEmailValidationSchema = Yup.object().shape({
  customerEmail: Yup?.string()
    ?.email('Invalid email')
    ?.required('Required Field'),
});

export const sendEmailDefaultValues = {
  customerEmail: '',
};

export const sendEmailFormField = [
  {
    componentProps: {
      name: 'customerEmail',
      label: 'Email',
    },
    component: RHFTextField,
    md: 12,
  },
];
