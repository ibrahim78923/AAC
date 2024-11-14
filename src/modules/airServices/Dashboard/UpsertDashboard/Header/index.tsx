import { PageTitledHeader } from '@/components/PageTitledHeader';
import { DASHBOARD, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT } from '../../Dashboard.data';
import { PreviewDashboard } from '../../PreviewDashboard';
import { AIR_SERVICES } from '@/constants/routes';
import { dashboardIsPortalOpenSelector } from '@/redux/slices/airServices/dashboard/selectors';
import { shallowEqual } from 'react-redux';

export const Header = () => {
  const router = useRouter();
  const { action } = router?.query;
  const isPortalOpen = useAppSelector(
    dashboardIsPortalOpenSelector,
    shallowEqual,
  );

  return (
    <>
      <PageTitledHeader
        title={`${
          action === DASHBOARD?.EDIT
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.CREATE
        } Dashboard`}
        canMovedBack
        moveBack={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
      />
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action ===
          SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.PREVIEW_DASHBOARD && (
          <PreviewDashboard />
        )}
    </>
  );
};
