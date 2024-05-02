import { useEffect } from 'react';
import { useTheme, Theme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './AddRoleDrawer.data';
import {
  getActiveAccountSession,
  getActiveProductSession,
  getSession,
} from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  airMarketerRolesAndRightsAPI,
  useGetRolesDataByIdQuery,
  usePostPermissionRoleMutation,
  useUpdateRoleRightsMutation,
} from '@/services/airMarketer/settings/roles-and-rights';

const useAddRoleDrawer: any = (isDrawerOpen: any, onClose: any) => {
  const { user }: any = getSession();
  const theme = useTheme<Theme>();
  const drawerConstants = {
    EDIT: 'edit',
    ADD: 'add',
    VIEW: 'view',
  };

  const disabled = isDrawerOpen?.type === drawerConstants?.VIEW;
  const activeProduct = getActiveProductSession();
  const activeAccount = getActiveAccountSession();

  const { useLazyGetPermissionsRolesByIdQuery } = airMarketerRolesAndRightsAPI;

  const [postPermissionRole, { isLoading: postRoleLoading }] =
    usePostPermissionRoleMutation();

  const [trigger, { data: viewPerdetails, isLoading }] =
    useLazyGetPermissionsRolesByIdQuery();

  const { data: defaultPermissions } = useGetRolesDataByIdQuery(
    isDrawerOpen?.id,
  );

  const defaultActivePermissions =
    defaultPermissions?.data?.permissions?.flatMap((p: any) => {
      return p?.subModules?.flatMap((per: any) => {
        return per?.permissions?.map((slg: any) => {
          return slg?.slug;
        });
      });
    });

  const allPermissions = defaultPermissions;

  const filteredPermissions = defaultPermissions?.data?.permissions?.flatMap(
    (rec: any) => {
      return rec?.subModules?.flatMap((item: any) => {
        return item?.permissions?.filter((e: any) => {
          return defaultActivePermissions?.includes(e?.slug);
        });
      });
    },
  );

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
    trigger(activeProduct?._id);
  }, [isDrawerOpen]);

  useEffect(() => {
    const data = defaultPermissions?.data;
    const fieldsToSet: any = {
      name: isDrawerOpen?.type === drawerConstants?.ADD ? '' : data?.name,
      description:
        isDrawerOpen?.type === drawerConstants?.ADD ? '' : data?.description,
      permissions:
        isDrawerOpen?.type === drawerConstants?.ADD
          ? []
          : filteredPermissions?.map((item: any) => {
              return item?.slug;
            }),
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewPerdetails, filteredPermissions]);

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    const organizationId = user?.organization?._id;
    const organizationCompanyAccountId = activeAccount?.company?._id;
    const productId = activeProduct?._id;
    try {
      if (isDrawerOpen?.type === drawerConstants?.ADD) {
        values.organizationId = organizationId;
        values.organizationCompanyAccountId = organizationCompanyAccountId;
        values.productId = productId;
        values.status = 'ACTIVE';
        await postPermissionRole({ body: values });
        reset();
      } else {
        const newPermissions = [...values.permissions];
        const editVals = {
          ...values,
          permissions: newPermissions,
          productId: activeProduct?._id,
        };
        await updateRoleRights({ id: isDrawerOpen?.id, body: editVals });
      }
      onClose();
      enqueueSnackbar(
        `${
          isDrawerOpen?.type === drawerConstants?.EDIT
            ? 'Changes save successfully'
            : 'New role added successfully'
        }`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(`${error?.data?.message}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    postRoleLoading,
    drawerConstants,
    viewPerdetails,
    allPermissions,
    activeAccount,
    handleSubmit,
    isLoading,
    onSubmit,
    disabled,
    methods,
    theme,
  };
};

export default useAddRoleDrawer;
