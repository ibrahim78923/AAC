import { Grid, Typography } from '@mui/material';
import { userManagement } from './UserManagement.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const UserManagement = () => {
  return (
    <>
      <Typography variant="h3">User Management</Typography>
      <br />
      <Grid container spacing={3}>
        {userManagement?.map((item: ISettingsCards) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <Grid item md={6} lg={4} xs={12}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
              />
            </Grid>
          </PermissionsGuard>
        ))}
      </Grid>
    </>
  );
};
