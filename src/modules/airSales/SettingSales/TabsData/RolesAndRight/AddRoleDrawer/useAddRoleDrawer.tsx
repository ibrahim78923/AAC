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
import { getActiveProductSession, getSession } from '@/utils';

const useAddRoleDrawer: any = (isDrawerOpen: any, onClose: any) => {
  const activeProduct = getActiveProductSession();
  // const activePermissions = getActivePermissionsSession();
  const activeAccount = localStorage?.getItem('ActiveAccount');
  const { user } = getSession();
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
    trigger(isDrawerOpen?.type !== 'add' && isDrawerOpen?.id);
  }, [isDrawerOpen]);

  useEffect(() => {
    const data = viewPerdetails?.data;
    const fieldsToSet: any = {
      name: isDrawerOpen?.type === 'add' ? '' : data?.name,
      description: isDrawerOpen?.type === 'add' ? '' : data?.description,
      permissions: data?.permissions?.map((item: any) => item),
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewPerdetails]);

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    const organizationId = user?.organization?._id;
    const organizationCompanyAccountId = activeAccount;
    const productId = activeProduct?._id;

    if (isDrawerOpen?.type === 'add') {
      values.organizationId = organizationId;
      values.organizationCompanyAccountId = organizationCompanyAccountId;
      values.productId = productId;
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
    // ActivePermissions,
  };
};

export default useAddRoleDrawer;
