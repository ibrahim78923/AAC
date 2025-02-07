import { Box } from '@mui/material';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { IDepartmentsProps } from '../Departments.interface';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const DepartmentsHeader = (props: IDepartmentsProps) => {
  const { handleSearch, setOpenUpsertModal, setSelectedDepartment } = props;
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
          <Search
            size="small"
            placeholder="Search Here"
            setSearchBy={handleSearch}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_DEPARTMENTS,
          ]}
        >
          <AddNewItemButton
            name=" Add New Department"
            onClick={() => {
              setOpenUpsertModal?.(true);
              setSelectedDepartment?.('');
            }}
          />
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
