import { SingleDashboard } from '../SingleDashboard';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { LinkButton } from '@/components/Buttons/LinkButton';

export const SingleDashboardDetails = () => {
  const router = useRouter();
  const dashboardId = router?.query?.dashboardId;

  return (
    <ApiRequestFlow
      hasNoData={!!!dashboardId}
      noDataMessage="No Dashboard Found"
      noDataChildren={
        <LinkButton link={AIR_SERVICES?.DASHBOARD} name="Go Home" />
      }
      noDataHeight="80vh"
    >
      <SingleDashboard isDetailMode />;
    </ApiRequestFlow>
  );
};
