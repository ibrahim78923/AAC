import { useState } from 'react';
import { AttachmentForm } from './AttachmentForm';
import { Attachments } from '@/components/Attachments';
import { useRouter } from 'next/router';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const Attachment = () => {
  const [addAttachment, setAddAttachment] = useState(false);
  const router = useRouter();
  const { purchaseOrderId } = router?.query;

  return (
    <>
      <Attachments
        recordId={purchaseOrderId as string}
        attachFileHandler={() => setAddAttachment(true)}
        canAttachFile
        permissionKey={[]}
      >
        <ContainerGrid
          customStyles={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
          }}
        >
          <CustomGrid md={6} lg={4}>
            <AttachmentForm />
          </CustomGrid>
        </ContainerGrid>
      </Attachments>

      {addAttachment && (
        <CustomCommonDialog
          isPortalOpen={addAttachment}
          closePortal={() => setAddAttachment(false)}
          showActionButtons={false}
        >
          <AttachmentForm setAddAttachment={setAddAttachment} />
        </CustomCommonDialog>
      )}
    </>
  );
};
