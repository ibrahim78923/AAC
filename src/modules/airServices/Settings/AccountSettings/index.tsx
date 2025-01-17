import { Grid, Typography } from '@mui/material';
import { accountSettings } from './AccountSettings.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const AccountSettings = () => {
  return (
    <>
      <Typography variant="h3">Account Settings</Typography>
      <br />
      <Grid container spacing={3}>
        {accountSettings?.map((item: ISettingsCards) => (
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
