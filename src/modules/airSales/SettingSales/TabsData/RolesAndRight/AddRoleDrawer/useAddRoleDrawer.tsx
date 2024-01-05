import { useEffect } from 'react';
import { useTheme, Theme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddRoleDrawer.data';
import {
  airSalesRolesAndRightsAPI,
  // useUpdateRoleRightsMutation
} from '@/services/airSales/roles-and-rights';

const useAddRoleDrawer: any = (isDrawerOpen: any) => {
  const theme = useTheme<Theme>();

  // console.log(isDrawerOpen?.id, 'id is')

  const {
    useLazyGetPermissionsRolesByIdQuery,
    // usePostPermissionRoleMutation
  } = airSalesRolesAndRightsAPI;

  // const [postPermissionRole] = usePostPermissionRoleMutation();

  const [trigger, { data: viewPerdetails }] =
    useLazyGetPermissionsRolesByIdQuery();

  const roleDefaultValues: any = {
    // roleId: '',
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
    trigger(isDrawerOpen?.id);
  }, [isDrawerOpen?.id]);

  useEffect(() => {
    const data = viewPerdetails?.data;
    const fieldsToSet: any = {
      // productId: data?.productDetails?.id,
      // organizationCompanyAccountId: data?.companyAccountDetails?.id,
      name: data?.name,
      description: data?.description,
      permissions: data?.permissions?.map((item: any) => item?.slug),
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewPerdetails]);

  // const [updateRoleRights] = useUpdateRoleRightsMutation();

  const onSubmit = async () => {
    // console.log(values, 'values are');
    reset();
    // if (query?.type === 'add') {
    //   values.organizationId = user?.organization?._id;
    //   postPermissionRole({ body: values });
    // } else {
    //   updateRoleRights({ id: roleId, body: values });
    // }
  };

  return {
    theme,
    methods,
    onSubmit,
    handleSubmit,
  };
};

export default useAddRoleDrawer;
