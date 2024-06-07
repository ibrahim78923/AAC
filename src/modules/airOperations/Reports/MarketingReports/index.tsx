import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { useMarketingReports } from './useMarketingReports';

export const MarketingReports = () => {
  const { router } = useMarketingReports();
  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddWhiteBgIcon />}
          onClick={() => {
            router?.push(AIR_OPERATIONS?.UPSERT_MARKETING_REPORTS);
          }}
        >
          Create report
        </Button>
      </PageTitledHeader>
    </>
  );
};
