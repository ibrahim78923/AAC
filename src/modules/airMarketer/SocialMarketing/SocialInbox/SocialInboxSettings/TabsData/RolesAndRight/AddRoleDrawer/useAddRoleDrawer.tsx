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
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  airMarketerRolesAndRightsAPI,
  useGetRolesDataByIdQuery,
  usePostPermissionRoleMutation,
  useUpdateRoleRightsMutation,
} from '@/services/airMarketer/settings/roles-and-rights';

const useAddRoleDrawer: any = (
  isDrawerOpen: any,
  onClose: any,
  setCheckedRows: any,
) => {
  const { user }: any = getSession();
  const theme = useTheme<Theme>();

  const disabled = isDrawerOpen?.type === DRAWER_TYPES?.VIEW;
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

  const { handleSubmit, reset, setValue, watch } = methods;

  const getModulePermissions = (subModules: any) => {
    return subModules?.flatMap((firstItem: any) => {
      return firstItem?.permissions?.map((item: any) => item?.slug);
    });
  };

  const selectAllPermissions = (subModules: any) => {
    let permissionsArray = [];
    const modulePermissions = getModulePermissions(subModules);
    if (
      !modulePermissions?.every(
        (permission: any) => watch('permissions')?.includes(permission),
      )
    ) {
      permissionsArray = modulePermissions?.concat(watch('permissions'));
    } else {
      permissionsArray = watch('permissions')?.filter(
        (permission: any) => !modulePermissions?.includes(permission),
      );
    }
    setValue('permissions', permissionsArray);
  };

  const setPayload = (permissionsArray: any) => {
    const data = defaultPermissions?.data;
    const fieldsToSet: any = {
      name: isDrawerOpen?.type !== DRAWER_TYPES?.ADD ? data?.name : '',
      description:
        isDrawerOpen?.type !== DRAWER_TYPES?.ADD ? data?.description : '',
      permissions: permissionsArray || [],
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  };

  useEffect(() => {
    trigger(activeProduct?._id);
  }, [isDrawerOpen]);

  useEffect(() => {
    const permissionsArray =
      isDrawerOpen?.type === DRAWER_TYPES?.ADD
        ? []
        : filteredPermissions?.map((item: any) => {
            return item?.slug;
          });
    setPayload(permissionsArray);
  }, [defaultPermissions]);

  const [updateRoleRights, { isLoading: loadingEditRole }] =
    useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    const organizationId = user?.organization?._id;
    const organizationCompanyAccountId = activeAccount?.company?._id;
    const productId = activeProduct?._id;
    try {
      if (isDrawerOpen?.type === DRAWER_TYPES?.ADD) {
        values.organizationId = organizationId;
        values.organizationCompanyAccountId = organizationCompanyAccountId;
        values.productId = productId;
        values.status = 'ACTIVE';
        await postPermissionRole({ body: values });
        reset();
      } else {
        const newPermissions = [...values?.permissions];
        const editVals = {
          ...values,
          permissions: newPermissions,
          productId: activeProduct?._id,
        };
        await updateRoleRights({ id: isDrawerOpen?.id, body: editVals });
      }
      setCheckedRows([]);
      onClose();
      enqueueSnackbar(
        `${
          isDrawerOpen?.type === DRAWER_TYPES?.EDIT
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
    selectAllPermissions,
    getModulePermissions,
    postRoleLoading,
    loadingEditRole,
    DRAWER_TYPES,
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
