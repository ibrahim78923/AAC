import { Typography } from '@mui/material';
import { userManagement } from './UserManagement.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const UserManagement = () => {
  return (
    <>
      <Typography variant="h3">User Management</Typography>
      <br />
      <ContainerGrid spacing={3}>
        {userManagement?.map((item: ISettingsCards) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <CustomGrid md={6} lg={4}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
              />
            </CustomGrid>
          </PermissionsGuard>
        ))}
      </ContainerGrid>
    </>
  );
};
