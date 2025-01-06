import { Grid } from '@mui/material';
import { useState } from 'react';
import { AttachmentForm } from './AttachmentForm';
import { Attachments } from '@/components/Attachments';
import { useRouter } from 'next/router';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          height={'70vh'}
        >
          <Grid item xs={12} md={6} lg={4}>
            <AttachmentForm />
          </Grid>
        </Grid>
      </Attachments>

      {addAttachment && (
        <CustomCommonDialog
          isPortalOpen={addAttachment}
          closePortal={() => setAddAttachment(false)}
        >
          <AttachmentForm setAddAttachment={setAddAttachment} />
        </CustomCommonDialog>
      )}
    </>
  );
};
