import { useEffect } from 'react';
import { useTheme, Theme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddRoleDrawer.data';
import {
  airSalesRolesAndRightsAPI,
  usePostPermissionRoleMutation,
  useUpdateRoleRightsMutation,
} from '@/services/airSales/roles-and-rights';

const useAddRoleDrawer: any = (isDrawerOpen: any, onClose: any) => {
  const theme = useTheme<Theme>();
  const { useLazyGetPermissionsRolesByIdQuery } = airSalesRolesAndRightsAPI;

  const [postPermissionRole] = usePostPermissionRoleMutation();

  const [trigger, { data: viewPerdetails }] =
    useLazyGetPermissionsRolesByIdQuery();

  const roleDefaultValues: any = {
    name: '',
    description: '',
    permissions: [],
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: roleDefaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    trigger(
      isDrawerOpen?.type === 'view'
        ? isDrawerOpen?.id
        : '65952ebafcfe18588f3e23f7',
    );
  }, [isDrawerOpen]);

  useEffect(() => {
    const data = viewPerdetails?.data;
    const fieldsToSet: any = {
      name: isDrawerOpen?.type === 'add' ? '' : data?.name,
      description: isDrawerOpen?.type === 'add' ? '' : data?.description,
      // permissions: data?.permissions?.map((item: any) => item),
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewPerdetails]);

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    // const organizationId  = user?.organization 65952bbf6d2c26398e492e42
    // const organizationCompanyAccountId = user?.account?.company?._id; 6597d07959d5ddb8341e316f
    // const productId = user?.product?._id; 6584ff9b508107024e1e3b14

    if (isDrawerOpen?.type === 'add') {
      values.organizationId = '65952bbf6d2c26398e492e42';
      values.organizationCompanyAccountId = '6597d07959d5ddb8341e316f';
      values.productId = '6584ff9b508107024e1e3b14';
      values.status = 'ACTIVE';
      postPermissionRole({ body: values });
      onClose();
      reset();
    } else {
      updateRoleRights({ id: isDrawerOpen?.id, body: values });
      onClose();
    }
  };

  return {
    theme,
    methods,
    onSubmit,
    handleSubmit,
    viewPerdetails,
  };
};

export default useAddRoleDrawer;
