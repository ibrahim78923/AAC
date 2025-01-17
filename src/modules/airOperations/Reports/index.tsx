import { Grid, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useReports } from './useReports';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const Reports = () => {
  const { reportsTypes, isLoading, isError, isFetching, refetch } =
    useReports();

  return (
    <>
      <Typography variant="h3" color="slateBlue.main">
        Reports and Analytics
      </Typography>
      <br />
      <ApiRequestFlow
        showSkeleton={isFetching || isLoading}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.MEDIUM_HORIZONTAL_TWO_LAYER_ROUNDED_CARD
        }
      >
        <Grid container spacing={3}>
          {reportsTypes?.map((report: any) => (
            <PermissionsGuard permissions={report?.permission} key={report?.id}>
              <Grid item md={5} lg={4} xs={12}>
                <ItemLinkCard
                  Icon={report?.avatar ?? null}
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
      </ApiRequestFlow>
    </>
  );
};
