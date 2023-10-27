import { Grid } from '@mui/material';
import { attachmentFileData } from './Attachment.data';
import { AttachmentForm } from './AttachmentForm';
import { AttachFileCard } from '@/components/AttachFileCard';
import { v4 as uuidv4 } from 'uuid';

export const Attachment = () => {
  return (
    <>
      {!!attachmentFileData.length ? (
        <Grid container spacing={2}>
          {attachmentFileData.map((singleAttachment: any) => (
            <Grid key={uuidv4()} item xs={12} sm={6} lg={4}>
              <AttachFileCard data={singleAttachment} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          minHeight={'70vh'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid item xs={12} md={3} xl={4}></Grid>
          <Grid item xs={12} md={6} xl={4}>
            <AttachmentForm />
          </Grid>
          <Grid item xs={12} md={3} xl={4}></Grid>
        </Grid>
      )}
    </>
  );
  // return <>attachments</>;
};
