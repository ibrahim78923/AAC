import { SingleDashboard } from '../SingleDashboard';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import ApiErrorState from '@/components/ApiErrorState';
import { Button } from '@mui/material';

export const SingleDashboardDetails = () => {
  const router = useRouter();
  const { dashboardId } = router?.query;
  if (!!!dashboardId)
    return (
      <ApiErrorState message="No Dashboard Found" height="90vh">
        <Button
          variant="contained"
          onClick={() => router?.push(AIR_SERVICES?.DASHBOARD)}
        >
          Go Home
        </Button>
      </ApiErrorState>
    );
  return <SingleDashboard isDetailMode />;
};
