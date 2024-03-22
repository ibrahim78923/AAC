import { useEffect } from 'react';
import { useTheme, Theme, Skeleton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddRoleDrawer.data';
import {
  airSalesRolesAndRightsAPI,
  usePostPermissionRoleMutation,
  useUpdateRoleRightsMutation,
} from '@/services/airSales/roles-and-rights';
import {
  getActiveAccountSession,
  getActiveProductSession,
  getSession,
} from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useAddRoleDrawer: any = (isDrawerOpen: any, onClose: any) => {
  const { user }: any = getSession();
  const theme = useTheme<Theme>();

  const disabled = isDrawerOpen?.type === 'view';

  const activeProduct = getActiveProductSession();
  const activeAccount = getActiveAccountSession();

  const { useLazyGetPermissionsRolesByIdQuery } = airSalesRolesAndRightsAPI;

  const [postPermissionRole, { isLoading: postRoleLoading }] =
    usePostPermissionRoleMutation();

  const [trigger, { data: viewPerdetails, isLoading }] =
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
      isDrawerOpen?.type === 'view' ? isDrawerOpen?.id : activeAccount?.role,
    );
  }, [isDrawerOpen]);

  useEffect(() => {
    const data = viewPerdetails?.data;

    const permissionsArray =
      // isDrawerOpen?.type !== 'add'
      isDrawerOpen?.type === 'view' || isDrawerOpen?.type === 'edit'
        ? data?.permissions?.flatMap(
            (item: any) =>
              item?.subModules?.flatMap(
                (mod: any) => mod?.permissions?.map((slg: any) => slg?.slug),
              ),
          )
        : [];

    const fieldsToSet: any = {
      name: isDrawerOpen?.type === 'add' ? '' : data?.name,
      description: isDrawerOpen?.type === 'add' ? '' : data?.description,
      permissions: permissionsArray || [],
    };

    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewPerdetails]);

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    const organizationId = user?.organization?._id;
    const organizationCompanyAccountId = activeAccount?.company?._id;
    const productId = activeProduct?._id;
    try {
      if (isDrawerOpen?.type === 'add') {
        values.organizationId = organizationId;
        values.organizationCompanyAccountId = organizationCompanyAccountId;
        values.productId = productId;
        values.status = 'ACTIVE';
        await postPermissionRole({ body: values });
        reset();
      } else {
        await updateRoleRights({ id: isDrawerOpen?.id, body: values });
      }
      onClose();
      enqueueSnackbar(
        `${
          isDrawerOpen?.type === 'edit'
            ? 'Changes save successfully'
            : 'New role added successfully'
        }`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const skeletonLines = [];
  for (let i = 0; i < 5; i++) {
    skeletonLines.push(
      <Skeleton key={i} animation="wave" height={60} sx={{ mb: 1 }} />,
    );
  }

  return {
    theme,
    methods,
    onSubmit,
    handleSubmit,
    viewPerdetails,
    activeAccount,
    isLoading,
    disabled,
    postRoleLoading,
    skeletonLines,
  };
};

export default useAddRoleDrawer;
