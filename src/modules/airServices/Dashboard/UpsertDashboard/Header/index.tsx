import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { DASHBOARD, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT } from '../../Dashboard.data';
import { PreviewDashboard } from '../../PreviewDashboard';

export const Header = () => {
  const router = useRouter();
  const { action } = router?.query;
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesDashboard?.isPortalOpen,
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
        moveBack={() => router?.push(AIR_SERVICES?.DASHBOARD)}
      />
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action ===
          SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.PREVIEW_DASHBOARD && (
          <PreviewDashboard />
        )}
    </>
  );
};
