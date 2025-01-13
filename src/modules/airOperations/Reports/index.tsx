import { Grid, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useReports } from './useReports';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import ApiErrorState from '@/components/ApiErrorState';

export const Reports = () => {
  const { reportsTypes, isLoading, isError, isFetching, refetch } =
    useReports();

  return (
    <>
      <Typography variant="h3" color="slateBlue.main">
        Reports and Analytics
      </Typography>
      <br />
      {isFetching || isLoading ? (
        <SkeletonCard
          isCircular={'rounded'}
          circularSkeletonSize={{ width: 70, height: 50 }}
          outerPadding={{ x: 1, y: 2 }}
          hasThirdSkeleton={false}
          length={2}
        />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={refetch} />
      ) : (
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
      )}
    </>
  );
};
