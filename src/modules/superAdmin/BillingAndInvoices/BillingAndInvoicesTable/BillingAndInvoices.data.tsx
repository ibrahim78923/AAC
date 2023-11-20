import { AvatarImage } from '@/assets/images';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { RHFSelect } from '@/components/ReactHookForm';
import {
  useGetOrganizationsQuery,
  useGetPlanTypeQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/billing-invoices';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

export const Columns = (
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
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.clientName,
      id: 'clientName',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2"> {info?.getValue()}</Typography>
            <Typography variant="body3">
              {info?.row?.original?.clientSub}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Client Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.planProducts,
      id: 'productsSuite',
      isSortable: true,
      header: 'Products/Suite',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {info?.row?.original?.planProducts?.length > 1 ? (
            <>
              <Typography variant="body3">CRM</Typography>
              {info?.row?.original?.planProducts?.map((data: any) => (
                <Typography variant="body3" key={uuidv4()}>
                  {data?.name}{' '}
                </Typography>
              ))}
            </>
          ) : (
            info?.row?.original?.planProducts?.map((data: any) => (
              <Typography variant="body3" key={uuidv4()}>
                {data?.name}{' '}
              </Typography>
            ))
          )}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.plantypes?.name,
      id: 'plantypes',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.plans?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.planDiscount,
      id: 'planDiscount',
      isSortable: true,
      header: 'Discount',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.plans?.defaultUsers,
      id: 'defaultUsers',
      isSortable: true,
      header: 'Default users',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.plans?.defaultStorage,
      id: 'DefaultStorage',
      isSortable: true,
      header: 'Default storage',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional storage',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.billingDate?.substring(0, 10),
      id: 'billingDate',
      isSortable: true,
      header: 'Billing Date',
      cell: (info: any) => info?.getValue(),
    },
  ];
};

export const validationSchema = Yup?.object()?.shape({
  ClientOrganization: Yup?.string(),
  productSuite: Yup?.string()?.trim(),
  planType: Yup?.string()?.trim(),
});

export const defaultValues = {
  ClientOrganization: '',
  productSuite: '',
  planType: '',
};

export const dataArray = () => {
  const { data: productData } = useGetProductsQuery<any>({
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

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  const { data: OrganizationsData } = useGetOrganizationsQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const Organizations = OrganizationsData?.data?.map((Organizations: any) => ({
    value: Organizations?._id,
    label: Organizations?.name,
  }));

  return [
    {
      componentProps: {
        name: 'ClientOrganization',
        label: 'Client & Organization',
        fullWidth: true,
        select: true,
      },

      options: Organizations,

      component: RHFSelect,

      md: 12,
    },
    {
      componentProps: {
        name: 'productSuite',
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
        name: 'planType',
        label: 'Plan Type',
        fullWidth: true,
        select: true,
      },

      options: planType,
      component: RHFSelect,
      md: 12,
    },
  ];
};
