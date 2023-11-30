import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import useContactsEditorDrawer from './useContactsEditorDrawer';
import {
  contactsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './ContactsEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const ContactsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, contactRecord } = props;

  const {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    onCloseHandler,
  } = useContactsEditorDrawer({ openDrawer, contactRecord, setOpenDrawer });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onCloseHandler}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodscontacts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {contactsDataArray({
                lifeCycleStagesData,
                contactStatusData,
              })?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ContactsEditorDrawer;
