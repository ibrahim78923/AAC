import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';

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
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.invoiceName,
    id: 'invoiceName',
    cell: (info: any) => info.getValue(),
    header: 'Invoice Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.invoiceAmount,
    id: 'invoiceAmount',
    isSortable: true,
    header: 'Invoice Amount',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.linkedQuote,
    id: 'linkedQuote',
    isSortable: true,
    header: 'Linked Quote',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdBy,
    id: 'createdBy',
    isSortable: true,
    header: 'Created By',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createdDate,
    id: 'createdDate',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => info.getValue(),
  },
];

//invoices table data
export const invoicesTableData: any = [
  {
    invoiceName: 'Iphone accessories',
    invoiceAmount: '£20',
    status: 'paid',
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
export const validationSchema = Yup.object().shape({
  requester: Yup.string().required('Field is Required'),
  impact: Yup.string().required('Field is Required'),
  plannedEndDate: Yup.date(),
});

export const defaultValues = {
  requester: '',
  impact: '',
  plannedEndDate: new Date(),
};

export const invoiceFilterFields = [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      select: true,
    },
    options: [{ value: 'BE', label: 'BE' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'impact',
      label: 'Impact',
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
