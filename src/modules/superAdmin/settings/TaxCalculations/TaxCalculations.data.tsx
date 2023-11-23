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
      name: 'applyOn',
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
  setIsDisabled: (value: boolean) => void,
  tableRowValues: any,
  setTableRowValues: any,
  setRowId: any,
) => {
  const handleRowSelect = (id: any) => {
    const selectedIndex = tableRowValues?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(tableRowValues, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(tableRowValues.slice(1));
    } else if (selectedIndex === tableRowValues.length - 1) {
      newSelected = newSelected.concat(tableRowValues.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        tableRowValues.slice(0, selectedIndex),
        tableRowValues.slice(selectedIndex + 1),
      );
    }
    const disabled = newSelected.length === 0;
    setIsDisabled(disabled);
    setTableRowValues(newSelected);
    if (newSelected.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
  };

  const isSelected = (id: any) => tableRowValues.indexOf(id) !== -1;
  return [
    {
      accessorFn: (row: any) => row._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={isSelected(info?.cell?.row?.original?._id)}
          name={info?.cell?.row?.original?._id}
          onClick={() => {
            handleRowSelect(info?.cell?.row?.original?._id);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
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
      header: 'Create Date',
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
