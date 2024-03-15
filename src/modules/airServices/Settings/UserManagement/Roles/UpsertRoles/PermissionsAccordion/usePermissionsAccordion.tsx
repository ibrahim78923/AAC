import useAuth from '@/hooks/useAuth';
import { useGetPermissionsByProductQuery } from '@/services/airServices/settings/user-management/roles';
import { useTheme } from '@mui/material';

export default function usePermissionsAccordion() {
  const theme: any = useTheme();

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;

  const { data, isLoading, isFetching, isError } =
    useGetPermissionsByProductQuery(
      {
        productId,
      },
      { refetchOnMountOrArgChange: true },
    );

  return { isError, isLoading, isFetching, data, theme };
}
