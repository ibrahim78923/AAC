import React from 'react';
import { Grid } from '@mui/material';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

const EmailChat = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <LeftPane />
        </Grid>
        <Grid item md={8} xs={12}>
          <RightPane />
        </Grid>
      </Grid>

      {/* {linkToDealModal && (
        <CommonModal
          open={linkToDealModal}
          handleClose={handleLinkToDealModal}
          title="Link to deal"
          okText="Save"
          footer
          cancelText="Cancel"
        >
          <Typography>Deal</Typography>
          <TextField placeholder="Search Deal" fullWidth size="small" />
        </CommonModal>
      )}
      {deleteModal && (
        <CommonModal
          open={deleteModal}
          handleClose={handleDeleteModal}
          title="Delete"
          okText="Delete"
          footer
          cancelText="Cancel"
        >
          <Typography>Are you sure you want to delete this email?</Typography>
        </CommonModal>
      )}
      {sendEmailModal && (
        <EmailEditorDrawer
          title={'New Email'}
          openDrawer={sendEmailModal}
          setOpenDrawer={handleSendEmailModal}
        />
      )}
      {replyModal && (
        <EmailEditorDrawer
          title={'Email'}
          userEmailList
          openDrawer={replyModal}
          setOpenDrawer={handleReplyModal}
        />
      )}
      {contactModal && (
        <ContactModal open={contactModal} onClose={handleContactModal} />
      )} */}
    </>
  );
};

export default EmailChat;
