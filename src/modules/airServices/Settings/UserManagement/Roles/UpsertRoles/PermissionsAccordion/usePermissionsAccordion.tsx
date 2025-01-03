import { useGetPermissionsByProductQuery } from '@/services/airServices/settings/user-management/roles';
import { getActiveAccountSession } from '@/utils';
import { useTheme } from '@mui/material';
import { useMemo, useState } from 'react';

const usePermissionsAccordion = (props: any) => {
  const { reset, getValues, watch } = props;
  const theme: any = useTheme();
  const [isSettingPermission, setIsSettingPermission] = useState<{
    [key: string]: any;
  }>({});

  const { role }: any = getActiveAccountSession();

  const { data, isLoading, isFetching, isError } =
    useGetPermissionsByProductQuery(
      {
        role,
      },
      { refetchOnMountOrArgChange: true },
    );

  const slugs = useMemo(() => {
    return (
      data?.data?.permissions?.flatMap(
        (parent: any) =>
          parent?.subModules?.flatMap(
            (subModule: any) =>
              subModule?.permissions?.map((item: any) => item?.slug),
          ) || [],
      ) || []
    );
  }, [data]);

  const switchChangeHandler = (e: any, data: any) => {
    setIsSettingPermission?.({ isLoading: true, name: data?.name });
    const slugs = data?.subModules?.flatMap(
      (subModule: any) =>
        subModule?.permissions?.map((item: any) => item?.slug),
    );
    const slugsObject = slugs?.reduce((acc: any, slug: any) => {
      acc[slug] = e?.target?.checked;
      return acc;
    }, {});

    reset((prev: any) => ({
      ...prev,
      ...slugsObject,
    }));
    setTimeout(() => setIsSettingPermission?.({}), 1000);
  };

  const checkAllPermissions = (data: any) => {
    const slugs = data?.subModules?.flatMap(
      (subModule: any) =>
        subModule?.permissions?.map((item: any) => item?.slug),
    );
    return slugs?.every((slug: any) => getValues()?.[slug]);
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

export default usePermissionsAccordion;
