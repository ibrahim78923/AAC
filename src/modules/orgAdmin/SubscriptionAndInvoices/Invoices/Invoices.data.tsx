import { Box, Checkbox, Tooltip, Typography } from '@mui/material';
import { styles } from './Invoices.style';
import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  useGetPlanTypesQuery,
  useGetProductsPlanManagementQuery,
} from '@/services/superAdmin/plan-mangement';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { ARRAY_INDEX } from '@/constants/strings';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@emotion/react';

export const columns = (selectedRows: any, handleCheckboxClick: any) => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <>
          <Checkbox
            color="primary"
            checked={selectedRows?.some(
              (selectedRow: any) =>
                selectedRow?._id === info?.row?.original?._id,
            )}
            name={info?.getValue()}
            onClick={() => handleCheckboxClick(info?.row?.original)}
          />
        </>
      ),
      header: '',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.ProductSuite,
      id: 'ProductSuite',
      cell: (info: any) => {
        const planProducts = info?.row?.original?.products;
        const tooltipTitle = (
          <Box>
            {planProducts?.map((data: any) => (
              <Typography key={uuidv4()} variant="h6">
                {data?.name}
              </Typography>
            ))}
          </Box>
        );
        return (
          <>
            {info?.row?.original?.plans?.isCRM ? (
              <Tooltip title={tooltipTitle}>
                <>
                  <Typography variant="body3" sx={{ cursor: 'pointer' }}>
                    {info?.row?.original?.plans?.name}
                  </Typography>
                  &nbsp;
                  <Typography
                    variant="body3"
                    fontSize={'11px'}
                    style={{
                      background: theme?.palette?.primary?.main,
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '5px',
                    }}
                  >
                    CRM
                  </Typography>
                </>
              </Tooltip>
            ) : (
              <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
                {info?.row?.original?.products[ARRAY_INDEX?.ZERO]?.name}
              </Box>
            )}
            <Box>{info?.row?.original?.plantypes}</Box>
          </>
        );
      },
      header: 'Products',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => dayjs(row?.billingDate).format(DATE_FORMAT?.UI),
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
          <Box>
            Due date:{' '}
            {dayjs(info?.row?.original?.dueDate)?.format(DATE_FORMAT?.UI)}
          </Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.total,
      id: 'total',
      isSortable: true,
      header: 'Invoice amount',
      cell: (info: any) => <>£ {info?.row?.original?.netAmount?.toFixed(2)}</>,
    },
    {
      accessorFn: (row: any) => row?.invoicePayDate,
      id: 'invoicePayDate',
      isSortable: true,
      header: 'Payment Date',
      cell: (info: any) => (
        <>
          {info?.getValue()
            ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
            : 'N/A'}
        </>
      ),
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
  productId: Yup?.string()?.trim()?.optional(),
  planId: Yup?.string()?.trim()?.optional(),
  status: Yup?.string()?.trim()?.optional(),
  billingDate: Yup?.string()?.trim()?.optional()?.nullable(),
  dueDate: Yup?.string()?.trim()?.optional()?.nullable(),
});

export const FilterInvoiceDefaultValues = {
  productId: '',
  planId: '',
  status: '',
};

export const FilterInvoiceFiltersDataArray = () => {
  const { data } = useGetProductsPlanManagementQuery({});
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
    //TODO: Both Page and Limit  will be dynamic in future ,now used just for to get data from API
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));
  return [
    {
      componentProps: {
        name: 'productId',
        label: 'Products',
        select: true,
      },
      options: productsOptions,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'planId',
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
        label: 'Status',
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
        name: 'billingDate',
        label: 'Invoice Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'dueDate',
        label: 'Payment Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
  ];
};
