import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { styles } from './Invoices.style';
import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {
  useGetPlanTypeQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/billing-invoices';
import { IMG_URL } from '@/config';
import { useLazyGetOrganizationsListQuery } from '@/services/common-APIs';

export const columns = (
  setIsGetRowValues: any,
  setIsChecked: any,
  isChecked: any,
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
            info?.cell?.row?.original?._id ===
              isGetRowValues?.cell?.row?.original?._id && isChecked
          }
          name={info?.getValue()}
          onClick={() => {
            !isChecked
              ? (setIsGetRowValues(info), setIsChecked(!isChecked))
              : (setIsGetRowValues([]), setIsChecked(!isChecked));
          }}
        />
      ),
      header: '',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => {
        `${row?.usersOrg?.firstName}  ${row?.usersOrg?.lastName}`;
      },
      id: 'ClientName',
      cell: (info: any) => {
        const avatarUrl = info?.row?.original?.organizations?.avatar?.url;
        const firstName = info?.row?.original?.usersOrg?.firstName;

        return (
          <>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <Avatar
                alt={`${firstName?.charAt(0)}`}
                src={`${IMG_URL}${avatarUrl}`}
                sx={{ color: 'black' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2">
                  {' '}
                  {`${firstName}  ${info?.row?.original?.usersOrg?.lastName}`}
                </Typography>
                <Typography variant="body3">
                  {info?.row?.original?.organizations?.name}
                </Typography>
              </Box>
            </Box>
          </>
        );
      },
      header: 'Client Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.products,
      id: 'Products/Suite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => (
        <>
          {info?.row?.original?.plans?.products?.map((data: any) => (
            <Typography variant="subtitle2" key={uuidv4()}>
              {data?.name}{' '}
            </Typography>
          ))}
          <Typography variant="body3">
            {info?.row?.original?.details?.plantypes} plan
          </Typography>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.billingDate?.substring(0, 10),
      id: 'billingDate',
      isSortable: true,
      header: 'Invoice Date',
      cell: (info: any) => <>{info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.Details,
      id: 'Details',
      isSortable: true,
      header: 'Details',
      cell: (info: any) => (
        <>
          <Box>Invoice # {info?.row?.original?.invoiceNo}</Box>
          <Box>Due date: {info?.row?.original?.dueDate?.substring(0, 10)}</Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.netAmount,
      id: 'netAmount',
      isSortable: true,
      header: 'Invoice Amount',
      cell: (info: any) => <>£ {info?.getValue()?.toFixed(2)}</>,
    },
    {
      accessorFn: (row: any) => row?.dueDate,
      id: 'dueDate',
      isSortable: true,
      header: 'Payment Date',
      cell: (info: any) => (
        <> {info?.row?.original?.dueDate?.substring(0, 10)}</>
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
  organizationId: Yup?.mixed(),
  productId: Yup?.string()?.trim()?.optional(),
  planTypeId: Yup?.string()?.trim()?.optional(),
  status: Yup?.string()?.trim()?.optional(),
  billingDate: Yup?.string()?.trim()?.optional()?.nullable(),
  dueDate: Yup?.string()?.trim()?.optional()?.nullable(),
});

export const FilterInvoiceFiltersDataArray = () => {
  const organizations = useLazyGetOrganizationsListQuery();
  const { data: productData } = useGetProductsQuery<any>({});

  const productSuite = productData?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { data: planTypeData } = useGetPlanTypeQuery<any>({});

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  return [
    {
      componentProps: {
        name: 'organizationId',
        label: 'Client & Organization',
        fullWidth: true,
        placeholder: 'Select organization',
        apiQuery: organizations,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'productId',
        label: 'Products',
        select: true,
      },
      options: productSuite,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'planTypeId',
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
        { value: 'OVERDUE', label: 'OVERDUE' },
        { value: 'PENDING', label: 'PENDING' },
        { value: 'SELECTED', label: 'SELECTED' },
        { value: 'PAID', label: 'PAID' },
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
