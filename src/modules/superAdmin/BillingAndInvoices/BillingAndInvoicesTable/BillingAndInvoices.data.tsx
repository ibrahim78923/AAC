import {
  Avatar,
  Box,
  Checkbox,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import { RHFAutocompleteAsync, RHFSelect } from '@/components/ReactHookForm';
import {
  useGetPlanTypeQuery,
  useGetProductsBilingInvoicesQuery,
} from '@/services/superAdmin/billing-invoices';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { IMG_URL } from '@/config';
import { REQUESTORS_STATUS } from '@/constants/strings';
import {
  CellInfoI,
  PlanProductI,
  PlanTypeI,
  RowDataI,
} from './billingandinvoices.interface';
import { useLazyGetOrganizationsListQuery } from '@/services/common-APIs';

export const Columns = (
  setIsGetRowValues: (value: any) => void,
  setIsChecked: (value: boolean) => void,
  isChecked: boolean,
  isGetRowValues: { cell: { row: { original: { _id: string } } } },
  theme: Theme,
) => {
  return [
    {
      accessorFn: (row: RowDataI) => row?.Id,
      id: 'Id',
      cell: (info: CellInfoI) => (
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
      accessorFn: (row: RowDataI) => {
        `${row?.usersOrg?.firstName}  ${row?.usersOrg?.lastName}`;
      },
      id: 'clientName',
      cell: (info: CellInfoI) => {
        const avatarUrl = info?.row?.original?.organizations?.avatar?.url;
        const firstName = info?.row?.original?.usersOrg?.firstName;
        const lastName = info?.row?.original?.usersOrg?.lastName;

        return (
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Avatar
              alt={`${firstName?.charAt(0)}`}
              src={`${IMG_URL}${avatarUrl}`}
              sx={{ color: 'black' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2">
                {`${firstName}  ${lastName}`}
              </Typography>
              <Typography variant="body3">
                {info?.row?.original?.organizations?.name}
              </Typography>
            </Box>
          </Box>
        );
      },
      header: 'Client Name',
      isSortable: true,
    },
    {
      accessorFn: (row: RowDataI) => row?.planProducts,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: CellInfoI) => {
        const planProducts = info?.row?.original?.planProducts;
        const tooltipTitle = (
          <Box>
            {planProducts?.map((data: PlanProductI) => (
              <Typography key={uuidv4()} variant="h6">
                {data?.name}
              </Typography>
            ))}
          </Box>
        );
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {info?.row?.original?.isCRM ? (
              <>
                <Tooltip title={tooltipTitle}>
                  <>
                    <Typography variant="body3" sx={{ cursor: 'pointer' }}>
                      {info?.row?.original?.plans?.name}
                    </Typography>{' '}
                    &nbsp;
                    <Typography
                      variant="body3"
                      fontSize={'11px'}
                      style={{
                        background: theme?.palette?.primary?.main,
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '5px',
                        width: 'fit-content',
                      }}
                    >
                      CRM
                    </Typography>
                  </>
                </Tooltip>
              </>
            ) : (
              info?.row?.original?.planProducts?.map((data: PlanProductI) => (
                <Typography variant="body3" key={uuidv4()}>
                  {data?.name}{' '}
                </Typography>
              ))
            )}
          </Box>
        );
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.plantypes?.name,
      id: 'plantypes',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: CellInfoI) => info?.getValue(),
    },
    {
      accessorFn: (row: RowDataI) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'plan Status',
      cell: (info: CellInfoI) => {
        const status = info?.getValue();
        let backgroundColor;

        if (status === REQUESTORS_STATUS?.ACTIVE) {
          backgroundColor = theme?.palette?.custom?.active_bg;
        } else if (status === REQUESTORS_STATUS?.PAYMENT_PENDING) {
          backgroundColor = theme?.palette?.custom?.warning_light;
        } else {
          backgroundColor = theme?.palette?.custom?.inactive_bg;
        }

        function formatText(text: any) {
          return text
            ?.toLowerCase()
            ?.split('_')
            ?.map(
              (word: any) => word?.charAt(0)?.toUpperCase() + word?.slice(1),
            )
            ?.join('');
        }

        return (
          <Typography
            variant="body3"
            sx={{
              borderRadius: '25px',
              padding: '5px 7px',
              background: backgroundColor,
            }}
          >
            {formatText(info?.getValue())}
          </Typography>
        );
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.plans?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price (£)',
      cell: (info: CellInfoI) => {
        return `£ ${info?.getValue()}`;
      },
    },

    {
      accessorFn: (row: RowDataI) => row?.planDiscount,
      id: 'planDiscount',
      isSortable: true,
      header: 'Discount',
      cell: (info: CellInfoI) => info?.getValue(),
    },

    {
      accessorFn: (row: RowDataI) => row?.plans?.defaultUsers,
      id: 'defaultUsers',
      isSortable: true,
      header: 'Default users',
      cell: (info: CellInfoI) => info?.getValue(),
    },

    {
      accessorFn: (row: RowDataI) => row?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: CellInfoI) => info?.getValue(),
    },
    {
      accessorFn: (row: RowDataI) => row?.plans?.defaultStorage,
      id: 'DefaultStorage',
      isSortable: true,
      header: 'Default storage (GB)',
      cell: (info: CellInfoI) => {
        return `${info?.getValue()} GB `;
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional storage (GB)',
      cell: (info: CellInfoI) => {
        return `${info?.getValue()} GB `;
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.billingDate?.substring(0, 10),
      id: 'billingDate',
      isSortable: true,
      header: 'Billing Date',
      cell: (info: CellInfoI) => info?.getValue(),
    },
  ];
};

export const assignPlanFilterDefaultValues = {
  organizationId: null,
};

export const validationSchema = Yup?.object()?.shape({
  organizationId: Yup?.mixed(),
  productId: Yup?.string()?.trim(),
  planTypeId: Yup?.string()?.trim(),
  plan: Yup?.string()?.trim(),
});

export const dataArray = () => {
  const organizations = useLazyGetOrganizationsListQuery();

  const { data: productData } = useGetProductsBilingInvoicesQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const productSuite = productData?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { data: planTypeData } = useGetPlanTypeQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: PlanTypeI) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  return [
    {
      componentProps: {
        name: 'organizationId',
        label: 'Client & Organisation',
        fullWidth: true,
        placeholder: 'Select Organisation',
        apiQuery: organizations,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'productId',
        label: 'Product/Suite',
        fullWidth: true,
        select: true,
      },

      options: productSuite,

      component: RHFSelect,

      md: 12,
    },
    {
      componentProps: {
        name: 'plan',
        label: 'Plan',
        select: true,
      },
      options: [
        { value: 'PRODUCT', label: 'Product' },
        { value: 'CRM', label: 'Crm' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'planTypeId',
        label: 'Plan Type',
        fullWidth: true,
        select: true,
      },

      options: planType,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'status',
        label: 'Plan Status',
        fullWidth: true,
        select: true,
      },

      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'Inactive' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};
