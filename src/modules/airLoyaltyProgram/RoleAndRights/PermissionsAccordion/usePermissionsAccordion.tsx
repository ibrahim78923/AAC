import { useGetLoyaltyProgramRoleAndRightsSinglePermissionByProductQuery } from '@/services/airLoyaltyProgram/roles-and-right';
import { getActiveAccountSession } from '@/utils';
import { useTheme } from '@mui/material';
import { ChangeEvent, useMemo, useState } from 'react';
import {
  IIsSettingPermissionState,
  IPermissionItem,
  IPermissionParentModule,
  IPermissionSubModule,
} from './PermissionsAccordion.interface';

export const usePermissionsAccordion = (props: any) => {
  const { reset, getValues, watch } = props;
  const theme = useTheme();
  const [isSettingPermission, setIsSettingPermission] =
    useState<IIsSettingPermissionState>({});

  const { role }: any = getActiveAccountSession();

  const { data, isLoading, isFetching, isError } =
    useGetLoyaltyProgramRoleAndRightsSinglePermissionByProductQuery(
      {
        role,
      },
      { refetchOnMountOrArgChange: true },
    );
  const slugs = useMemo(() => {
    return (
      data?.data?.permissions?.flatMap(
        (parent: IPermissionParentModule) =>
          parent?.subModules?.flatMap(
            (subModule: IPermissionSubModule) =>
              subModule?.permissions?.map(
                (item: IPermissionItem) => item?.slug,
              ),
          ) || [],
      ) || []
    );
  }, [data]);

  const switchChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    data: IPermissionParentModule,
  ) => {
    setIsSettingPermission?.({ isLoading: true, name: data?.name });
    const slugs = data?.subModules?.flatMap(
      (subModule: IPermissionSubModule) =>
        subModule?.permissions?.map((item: IPermissionItem) => item?.slug),
    );
    const slugsObject = slugs?.reduce(
      (acc: Record<string, boolean>, slug: string | any) => {
        acc[slug] = e?.target?.checked;
        return acc;
      },
      {},
    );
    reset((prev: any) => ({
      ...prev,
      ...slugsObject,
    }));
    setTimeout(() => setIsSettingPermission?.({}), 1000);
  };

  const checkAllPermissions = (data: IPermissionParentModule) => {
    const slugs = data?.subModules?.flatMap(
      (subModule: IPermissionSubModule) =>
        subModule?.permissions?.map((item: IPermissionItem) => item?.slug),
    );
    return slugs?.every((slug: string | any) => getValues()?.[slug]);
  };

  watch(slugs);

  return {
    isError,
    isLoading,
    isFetching,
    data,
    theme,
    switchChangeHandler,
    isSettingPermission,
    checkAllPermissions,
  };
};
