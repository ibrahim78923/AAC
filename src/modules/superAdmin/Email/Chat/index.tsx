import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Draft from './RightSide/Draft';
import { useChat } from './useChat';
import CommonModal from '@/components/CommonModal';
import EmailEditorDrawer from '../SendEmail';
import ContactModal from './ContactModal';

const EmailChat = () => {
  const {
    currTab,
    leftSideData,
    rightSideData,
    handleLinkToDealModal,
    linkToDealModal,
    deleteModal,
    handleDeleteModal,
    sendEmailModal,
    handleSendEmailModal,
    handleReplyModal,
    replyModal,
    contactModal,
    handleContactModal,
  } = useChat();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <LeftSide {...leftSideData} />
        </Grid>
        <Grid item md={8} xs={12}>
          {currTab == 2 ? (
            <Draft />
          ) : (
            <RightSide key={'right side'} {...rightSideData} />
          )}
        </Grid>
      </Grid>

      {linkToDealModal && (
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
      )}
    </>
  );
};

export default EmailChat;
