import { SingleDashboard } from '../SingleDashboard';
import { useRouter } from 'next/router';
import ApiErrorState from '@/components/ApiErrorState';
import { Button } from '@mui/material';
import { AIR_SERVICES } from '@/constants/routes';

export const SingleDashboardDetails = () => {
  const router = useRouter();
  const dashboardId = router?.query?.dashboardId;

  if (!!!dashboardId)
    return (
      <ApiErrorState message="No Dashboard Found" height="90vh">
        <Button
          className="small"
          variant="contained"
          onClick={() => router?.push(AIR_SERVICES?.DASHBOARD)}
        >
          Go Home
        </Button>
      </ApiErrorState>
    );
  return <SingleDashboard isDetailMode />;
};
