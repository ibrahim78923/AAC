import { Checkbox } from '@mui/material';
import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
// import { StatusDropdown } from './InvoicesCommonComponents/StatusDropDown';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const cardDetails = [
  {
    label: 'Air Applecart',
    details: [
      { title: '123 street Address' },
      { title: 'City | State | Zip Code' },
      { title: 'Phone No' },
      { title: 'Company Email' },
    ],
  },
];

export const clientDetails = [
  {
    label: 'Client Information',
    details: [
      { title: '123 street Address' },
      { title: 'City | State | Zip Code' },
      { title: 'Phone No' },
      { title: 'Company Email' },
    ],
  },
];

export const invoiceDetail = [
  { title: 'Invoice No', value: 'Doc-3' },
  { title: 'Invoice Date', value: 'April 9 2023' },
  { title: 'Due Date', value: 'April 27 2023' },
  { title: 'Prepared By', value: 'Azeem Aslam' },
];

//sales list view columns
export const invoicesTableColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.invoiceName,
    id: 'invoiceName',
    cell: (info: any) => info?.getValue(),
    header: 'Invoice Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.invoiceAmount,
    id: 'invoiceAmount',
    isSortable: true,
    header: 'Invoice Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    // cell: (info: any) => {
    //   return <StatusDropdown data={info} />;
    // },
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.linkedQuote,
    id: 'linkedQuote',
    isSortable: true,
    header: 'Linked Quote',
    cell: (info: any) => info?.row?.original?.quote?.name,
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created By',
    cell: (info: any) =>
      `${info?.row?.original?.preparedBy?.firstName} ${info?.row?.original?.preparedBy?.lastName}`,
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
];

//invoices table data
export const invoicesTableData: any = [
  {
    invoiceName: 'Iphone accessories',
    invoiceAmount: '£20',
    status: 'Published',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
  {
    invoiceName: 'Tablet accessories',
    invoiceAmount: '£20',
    status: 'Published',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
  {
    invoiceName: 'Computer accessories',
    invoiceAmount: '£20',
    status: 'paid',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
  {
    invoiceName: 'Mobile accessories',
    invoiceAmount: '£20',
    status: 'Draft',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
  {
    invoiceName: 'Mac accessories',
    invoiceAmount: '£20',
    status: 'View',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
  {
    invoiceName: 'Electric accessories',
    invoiceAmount: '£20',
    status: 'paid',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
  {
    invoiceName: 'Electronic accessories',
    invoiceAmount: '£20',
    status: 'Published',
    linkedQuote: 'Iphone import from Uk',
    createdBy: 'Azeem Aslam',
    createdDate: '23/09/2023',
  },
];

//filter drwaer form

export const invoiceFilterFields = [
  {
    componentProps: {
      name: 'Status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Paid', label: 'Paid' },
      { value: 'Draft', label: 'Draft' },
      { value: 'Published', label: 'Published' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'CreatedDate',
      label: 'CreatedDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'Created By',
      label: 'Created By',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

// products table data
export const productsTableColumns = () =>
  // setIsDeleteModal: any,
  // setIsDrawerOpen: any,
  [
    {
      accessorFn: (row: any) => row?.Sr,
      id: 'Sr',
      cell: (info: any) =>
        info?.row?.index !== undefined ? `${info?.row?.index + 1}` : null,
      header: 'Sr#',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'productName',
      cell: (info: any) => info.getValue(),
      header: 'Product Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.unitPrice,
      id: 'unitPrice',
      isSortable: true,
      header: 'Unit Price',
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
      accessorFn: (row: any) => row?.unitDiscount,
      id: 'unitDiscount',
      isSortable: true,
      header: 'Unit Discount',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.totalPrice,
      id: 'totalPrice',
      isSortable: true,
      header: 'Total Price',
      cell: (info: any) => {
        return (
          <>
            {' '}
            {info?.row?.original?.unitPrice *
              info?.row?.original?.quantity}{' '}
          </>
        );
      },
    },
    {
      accessorFn: (row: any) => dayjs(row?.createdAt)?.format(DATE_FORMAT?.UI),
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info?.getValue(),
    },
  ];

// products table data
export const productsTableData: any = [
  {
    Sr: '1',
    productName: 'NADSSP - 16',
    unitPrice: '£ 40',
    quantity: '1',
    unitDiscount: 'gbp',
    totalPrice: '£ 40',
    createdDate: '23/09/2023',
  },
  {
    Sr: '2',
    productName: 'NADSSP - 19',
    unitPrice: '£ 61',
    quantity: '1',
    unitDiscount: '%',
    totalPrice: '£ 60',
    createdDate: '23/09/2023',
  },
];
