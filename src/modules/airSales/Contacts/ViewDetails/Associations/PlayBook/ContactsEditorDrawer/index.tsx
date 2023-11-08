import React from 'react';

import { Box, Grid, Typography, TextField } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import useContactsEditorDrawer from './useContactsEditorDrawer';
import { drawerButtonTitle, drawerTitle } from './ContactsEditorDrawer.data';

const ContactsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const { handleSubmit, onSubmit, methodscontacts } = useContactsEditorDrawer();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ px: '10px' }}>
          <Typography>Discovery Call Script</Typography>
          <Typography>
            Use this playbook to help guide your first call with a
            prospect.During this call, you want to ask questions to uncover the
            prospect’s needs, challenges and goals as they relate to your
            product or service
          </Typography>
          <Typography sx={{ my: '10px' }}>
            Before the call, you should:
          </Typography>
          <ol style={{ paddingLeft: '10px' }}>
            <li>Research your prospect’s business</li>
            <li>Create an agenda and send it to your prospect</li>
            <li> Set a time and date that works for both of you</li>
          </ol>
        </Box>
        <Typography my="15px">
          Below are some key questions to ask during your discovery call.
        </Typography>
        <FormProvider
          methods={methodscontacts}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item spacing={4} my="15px">
            <Typography variant="overline">
              What are the top initiatives at your company right now?
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              size="small"
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item spacing={4} my="15px">
            <Typography variant="overline">
              What are the top initiatives at your company right now?
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              size="small"
              sx={{ my: 2 }}
            />
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default ContactsEditorDrawer;
