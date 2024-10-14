import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTiers } from './useUpsertTiers';

export const UpsertTiers = () => {
  const { isPortalOpen, closePortal } = useUpsertTiers();
  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      footer
      isOk
      okText="Save"
      title={isPortalOpen?.action}
      onClose={closePortal}
    >
      <></>
    </CommonDrawer>
  );
};
