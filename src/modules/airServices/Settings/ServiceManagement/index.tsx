import { Grid, Typography } from '@mui/material';
import { serviceManagement } from './ServiceManagement.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const ServiceManagement = () => {
  return (
    <>
      <Typography variant="h3">Service Management</Typography>
      <br />
      <Grid container spacing={3}>
        {serviceManagement?.map((item: ISettingsCards) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <Grid item md={6} lg={4} xs={12}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
                itemPurpose={item?.purpose}
                display="block"
                itemTypeFontSize="h6"
                marginY={1.2}
              />
            </Grid>
          </PermissionsGuard>
        ))}
      </Grid>
    </>
  );
};
