import { Grid } from '@mui/material';
import { attachmentFileData } from './Attachment.data';
import { AttachFileCard } from '@/components/AttachFileCard';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';

export const Attachment = () => {
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' });

  return (
    <Grid container spacing={2}>
      {attachmentFileData?.map((singleAttachment: any) => (
        <Grid item xs={12} sm={6} lg={4} key={uuidv4()}>
          <AttachFileCard
            data={singleAttachment}
            onDelete={() =>
              setDeleteModal({ open: true, id: singleAttachment?.name })
            }
          />
        </Grid>
      ))}
      <AlertModals
        message={'Are you sure you want to delete?'}
        type={'delete'}
        open={deleteModal?.open}
        handleClose={() => setDeleteModal({ open: false, id: '' })}
        handleSubmitBtn={() => {
          setDeleteModal({ open: false, id: '' });
          enqueueSnackbar('Attachment Deleted Successfully!', {
            variant: 'success',
          });
        }}
      />
    </Grid>
  );
};
