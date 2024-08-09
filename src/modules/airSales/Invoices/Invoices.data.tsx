import { Checkbox } from '@mui/material';
import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
import StatusBadge from '@/components/StatusBadge';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { InfoI, RowI } from './invoice.interface';

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
export const invoicesTableColumns: any = (
  selectedRow: any,
  setSelectedRow: (row: any) => void,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: (id: any) => void,
  handleUpdateStatus: any,
) => {
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected.length === 0);
    if (newSelected.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedRow(newSelected);
      setIsActionsDisabled(false);
      return;
    }
    setSelectedRow([]);
    setIsActionsDisabled(true);
  };

  const isSelected = (id: any) => selectedRow?.indexOf(id) !== -1;

  return [
    {
      accessorFn: (row: RowI) => row?._id,
      id: '_id',
      cell: (info: InfoI) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
            }}
          />
        );
      },
      header: (info: InfoI) => {
        const rows = info?.table?.options?.data;
        return (
          <Checkbox
            color="primary"
            indeterminate={
              selectedRow?.length > 0 && selectedRow?.length < rows?.length
            }
            checked={
              rows?.length > 0 &&
              selectedRow?.length === info?.table?.options?.data?.length
            }
            onChange={(event) => handleSelectAllClick(event, rows)}
          />
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: RowI) => row?.invoiceNo,
      id: 'invoiceNo',
      cell: (info: InfoI) => info?.getValue(),
      header: 'Invoice Number',
      isSortable: true,
    },
    {
      accessorFn: (row: RowI) => row?.quote?.deal?.amount,
      id: 'invoiceAmount',
      isSortable: true,
      header: 'Invoice Amount',
      cell: (info: InfoI) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: RowI) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        return (
          <StatusBadge
            value={info?.row?.original?.status}
            onChange={(e: any) => {
              handleUpdateStatus(e?.target?.value, info?.row?.original?._id);
            }}
            options={[
              {
                label: 'Paid',
                value: 'PAID',
              },
              {
                label: 'Published',
                value: 'PUBLISHED',
              },
              {
                label: 'Draft',
                value: 'DRAFT',
              },
            ]}
          />
        );
      },
    },
    {
      accessorFn: (row: RowI) => row?.quote?.name,
      id: 'linkedQuote',
      isSortable: true,
      header: 'Linked Quote',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: RowI) =>
        `${row?.preparedBy?.firstName} ${row?.preparedBy?.lastName}`,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: RowI) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
  ];
};

//filter drawer form
export const invoiceFilterFields = (employeeListData: any) => [
  {
    id: 'status',
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'PAID', label: 'Paid' },
      { value: 'DRAFT', label: 'Draft' },
      { value: 'PUBLISHED', label: 'Published' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: 'creationDate',
    componentProps: {
      name: 'creationDate',
      label: 'CreatedDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    id: 'createdBy',
    componentProps: {
      name: 'createdBy',
      label: 'Created By',
      fullWidth: true,
      select: true,
    },
    options: employeeListData,
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
