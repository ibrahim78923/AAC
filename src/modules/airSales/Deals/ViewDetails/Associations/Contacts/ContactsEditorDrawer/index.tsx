import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import useContactsEditorDrawer from './useContactsEditorDrawer';
import {
  contactsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './ContactsEditorDrawer.data';
import { ContactsEditorDrawerProps } from '../../Associations-interface';

const ContactsEditorDrawer = (props: ContactsEditorDrawerProps) => {
  const { openDrawer, setOpenDrawer, contactRecord, dealId } = props;

  const {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    contactOwnerData,
    postContactLoading,
    orgId,
    onCloseHandler,
  } = useContactsEditorDrawer({
    openDrawer,
    contactRecord,
    setOpenDrawer,
    dealId,
  });

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
        isLoading={postContactLoading}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodscontacts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              {contactsDataArray({
                lifeCycleStagesData,
                contactStatusData,
                contactOwnerData,
                orgId,
              })?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component
                    disabled={openDrawer === 'View' ? true : false}
                    {...item?.componentProps}
                    size={'small'}
                  >
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
