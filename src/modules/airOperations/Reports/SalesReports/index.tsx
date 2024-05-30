import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { useSalesReports } from './useSalesReports';

export const SalesReports = () => {
  const { router } = useSalesReports();
  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
      >
        <Button variant="contained" startIcon={<AddWhiteBgIcon />}>
          Create report
        </Button>
      </PageTitledHeader>
    </>
  );
};
