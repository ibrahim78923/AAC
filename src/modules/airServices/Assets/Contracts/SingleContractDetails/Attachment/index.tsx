import { useRouter } from 'next/router';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';

export const Attachment = () => {
  const router = useRouter();
  const { contractId } = router?.query;
  return (
    <>
      <Attachments
        recordId={contractId}
        permissionKey={[
          AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
        ]}
      />
    </>
  );
};
