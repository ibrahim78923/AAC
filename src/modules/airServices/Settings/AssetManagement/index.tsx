import { Grid, Typography } from '@mui/material';
import { assetManagement } from './AssetManagement.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const AssetManagement = () => {
  return (
    <>
      <Typography variant="h3">Asset Management</Typography>
      <br />
      <Grid container spacing={3}>
        {assetManagement?.map((item: ISettingsCards) => (
          <PermissionsGuard key={item?.id} permissions={item?.permissions}>
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
