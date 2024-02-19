import {
  RHFSwitchableDatepicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFMultiCheckbox,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { DATE_FORMAT } from '@/constants';
export const addTaxFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Field is Required'),
  percentage: Yup.string().trim().required('Field is Required'),
  applyOn: Yup.array()
    .required('Field is Required')
    .min(1, 'At least one item is required'),
});
export const addTaxFormDefaultValues = {
  name: '',
  percentage: '',
  applyOn: [],
  description: '',
};
export const addTaxFormDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Tax Name*',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'percentage',
      label: 'Tax Percentage*',
      type: 'number',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Select Forms*',
      name: 'applyOn',
      options: [
        { value: 'invoice', label: 'Invoice' },
        { value: 'quotes', label: 'Quotes' },
        { value: 'subscriptions', label: 'Subscriptions' },
        { value: 'products', label: 'Products' },
      ],
    },
    component: RHFMultiCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Tax Description',
    },
    component: RHFEditor,
    md: 12,
  },
];

//Filters
export const taxFormFiltersDefaultValues = {
  status: '',
  createdDate: null,
  applyOn: '',
};

export const taxFormFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Select Form',
      select: true,
    },
    options: [
      { value: 'invoice', label: 'Invoices' },
      { value: 'quotes', label: 'Quotes' },
      { value: 'subscriptions', label: 'Subscriptions' },
      { value: 'products', label: 'Products' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const columns = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
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
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => {
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
      header: (info: any) => {
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
      accessorFn: (row: any) => row.name,
      id: 'name',
      cell: (info: any) => info.getValue(),
      header: 'Tax Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.percentage,
      id: 'percentage',
      isSortable: true,
      header: 'tax Percentage',
      cell: (info: any) => <>{info.getValue()}%</>,
    },
    {
      accessorFn: (row: any) => row.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => {
        const response = info?.getValue().replace(/<[^>]*>/g, '');
        return <>{response}</>;
      },
    },
    {
      accessorFn: (row: any) => row.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT.UI),
    },
    {
      accessorFn: (row: any) => row.applyOn,
      id: 'applyOn',
      isSortable: true,
      header: 'Active Module',
      cell: (info: any) => info.getValue().join(', '),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
  ];
};
