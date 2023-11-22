import { Box, Checkbox } from '@mui/material';
import { styles } from './Invoices.style';
import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  useGetPlanTypesQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/plan-mangement';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?.id ===
              isGetRowValues?.cell?.row?.original?.id && ischecked
          }
          name={info?.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIschecked(!ischecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.ProductSuite,
      id: 'ProductSuite',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.getValue()}
          </Box>
          <Box>{info?.row?.original?.plantypes}</Box>
        </>
      ),
      header: 'Products',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.billingDate,
      id: 'billingDate',
      isSortable: true,
      header: 'Invoice Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.Details,
      id: 'Details',
      isSortable: true,
      header: 'Details',
      cell: (info: any) => (
        <>
          <Box>{info?.getValue()}</Box>
          <Box>Invoice # {info?.row?.original?.invoiceNo}</Box>
          <Box>Due date: {info?.row?.original?.dueDate}</Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.total,
      id: 'total',
      isSortable: true,
      header: 'Invoice amount',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.InvoiceAmount,
      id: 'InvoiceAmount',
      isSortable: true,
      header: 'Payment Date',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <Box sx={styles?.chip}>{info?.getValue()}</Box>,
    },
  ];
};

export const FilterInvoiceValidationSchema = Yup?.object()?.shape({
  products: Yup?.string()?.trim()?.required('Field is Required'),
  plan: Yup?.string()?.trim()?.required('Field is Required'),
  status: Yup?.string()?.trim()?.required('Field is Required'),
  InvoiceDate: Yup?.string()?.trim()?.required('Field is Required'),
  PaymentDate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const FilterInvoiceDefaultValues = {
  products: '',
  plan: '',
  status: '',
  InvoiceDate: '',
  PaymentDate: '',
};

export const FilterInvoiceFiltersDataArray = () => {
  const { data } = useGetProductsQuery({});
  const productsOptions: { value: number; label: string } = data?.data?.map(
    (products: any) => {
      return {
        value: products?._id,
        label: products?.name,
      };
    },
  );
  const { data: planTypeData } = useGetPlanTypesQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));
  return [
    {
      componentProps: {
        name: 'products',
        label: 'Products',
        select: true,
      },
      options: productsOptions,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'plan',
        label: 'Plan type',
        select: true,
      },
      options: planType,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'status',
        label: 'status',
        select: true,
      },
      options: [
        { value: 'SELECTED', label: 'Selected' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'PAID', label: 'Paid' },
        { value: 'OVERDUE', label: 'Overdue' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'InvoiceDate',
        label: 'Invoice Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'PaymentDate',
        label: 'Payment Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
  ];
};
