import { Grid, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ReportsTypesI } from './Reports.interface';
import { useReports } from './useReports';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';

export const Reports = () => {
  const { reportsTypes, checkApiStatus } = useReports();

  return (
    <>
      <Typography variant="h3" color="slateBlue.main">
        Reports and Analytics
      </Typography>
      <br />
      {checkApiStatus() ?? (
        <Grid container spacing={3}>
          {reportsTypes?.map((report: ReportsTypesI) => (
            <PermissionsGuard permissions={report?.permission} key={report?.id}>
              <Grid item md={5} lg={4} xs={12}>
                <ItemLinkCard
                  Icon={report?.avatar}
                  itemType={report?.type}
                  itemLink={report?.link}
                  itemPurpose={report?.purpose}
                  itemTypeFontSize="h5"
                  hasLink={!!report?.findAccount?.hasAccount}
                  itemPurposeFontSize="body3"
                  hasQuery={{
                    id: report?.findAccount?.productId,
                    baseModule: report?.baseModule,
                  }}
                />
              </Grid>
            </PermissionsGuard>
          ))}
        </Grid>
      )}
    </>
  );
};
