import { Box, Button, Dialog, Grid } from '@mui/material';
import { attachmentFileData } from './Attachment.data';
import { AttachFileCard } from '@/components/AttachFileCard';
import { v4 as uuidv4 } from 'uuid';
import { Fragment, useState } from 'react';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { AttachmentForm } from './AttachmentForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Attachment = () => {
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' });
  const [addAttachment, setAddAttachment] = useState(false);

  return (
    <Fragment>
      {!!attachmentFileData.length ? (
        <Fragment>
          <Box mb={2} textAlign={'end'}>
            <Button
              variant="outlined"
              onClick={() => {
                setAddAttachment(true);
              }}
              startIcon={<AddCircleIcon />}
            >
              Attach Files
            </Button>
          </Box>
          <Grid container spacing={2}>
            {attachmentFileData.map((singleAttachment: any) => (
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
        </Fragment>
      ) : (
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
      )}
      <Dialog
        open={addAttachment}
        onClose={() => setAddAttachment(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box width={'500px'} p={2}>
          <AttachmentForm setAddAttachment={setAddAttachment} />
        </Box>
      </Dialog>
    </Fragment>
  );
};
