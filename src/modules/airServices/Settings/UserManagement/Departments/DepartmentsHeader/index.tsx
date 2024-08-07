import { Box, Button } from '@mui/material';
import { PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const DepartmentsHeader = (props: any) => {
  const { setSearch, setOpenUpsertModal, setSelectedDepartment } = props;
  const router = useRouter();
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={1}
    >
      <PageTitledHeader
        title={'Departments'}
        canMovedBack
        moveBack={() =>
          router?.push({ pathname: AIR_SERVICES?.USER_MANAGEMENT })
        }
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.VIEW_DEPARTMENTS,
          ]}
        >
          <Search placeholder="Search Here" setSearchBy={setSearch} />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_DEPARTMENTS,
          ]}
        >
          <Button
            startIcon={<PlusSharedColorIcon />}
            variant="contained"
            onClick={() => {
              setOpenUpsertModal?.(true);
              setSelectedDepartment?.('');
            }}
          >
            Add New Department
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
