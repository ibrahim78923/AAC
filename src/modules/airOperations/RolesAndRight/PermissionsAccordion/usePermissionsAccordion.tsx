import { useGetPermissionsByProductQuery } from '@/services/airServices/settings/user-management/roles';
import { getActiveAccountSession } from '@/utils';
import { useTheme } from '@mui/material';

export const usePermissionsAccordion = () => {
  const theme: any = useTheme();

  const { role }: any = getActiveAccountSession();

  const { data, isLoading, isFetching, isError } =
    useGetPermissionsByProductQuery(
      {
        role,
      },
      { refetchOnMountOrArgChange: true },
    );

  return { isError, isLoading, isFetching, data, theme };
};
