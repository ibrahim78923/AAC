import { Grid } from '@mui/material';
import { reportsTypes } from './Reports.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ServicesReportsTypesI } from './Reports.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const Reports = () => {
  return (
    <>
      <PageTitledHeader title="Reports and Analytics" />
      <br />
      <Grid container spacing={3}>
        {reportsTypes?.map((item: ServicesReportsTypesI) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <Grid item xs={12} md={6} lg={4}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
                itemPurpose={item?.purpose}
                itemTypeFontSize="h6"
              />
            </Grid>
          </PermissionsGuard>
        ))}
      </Grid>
    </>
  );
};
