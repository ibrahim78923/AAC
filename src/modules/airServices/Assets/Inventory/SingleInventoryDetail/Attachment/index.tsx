import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { Attachments } from '@/components/Attachments';
import { useRouter } from 'next/router';

export const Attachment = () => {
  const router = useRouter();
  const { inventoryId } = router?.query;
  return (
    <>
      <Attachments
        recordId={inventoryId}
        permissionKey={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ATTACHMENTS,
        ]}
      />
    </>
  );
};
