import { Box, Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';
import useContactsEditorDrawer from './useContactsEditorDrawer';
import {
  contactOptions,
  contactsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './ContactsEditorDrawer.data';
import { ContactsEditorDrawerProps } from '../../Associations-interface';
import { DRAWER_TYPES } from '@/constants/strings';
import { CONTACT_TYPE } from '@/constants';

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
    watchContacts,
    extContactOptions,
    theme,
    associationLoading,
  } = useContactsEditorDrawer({
    openDrawer,
    contactRecord,
    setOpenDrawer,
    dealId,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer?.isToggle}
        onClose={onCloseHandler}
        title={drawerTitle[openDrawer?.type]}
        okText={drawerButtonTitle[openDrawer?.type]}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer?.type === DRAWER_TYPES?.VIEW ? false : true}
        isLoading={postContactLoading || associationLoading}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodscontacts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={contactOptions}
                  name="contactType"
                  label={false}
                  defaultValue="new-contact"
                />
              </Grid>
              {watchContacts === CONTACT_TYPE?.NEW_CONTACT ? (
                contactsDataArray({
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
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={theme?.palette?.grey[600]}
                  >
                    Choose Contact{' '}
                    <span style={{ color: theme?.palette?.error?.main }}>
                      *
                    </span>
                  </Typography>
                  <RHFSearchableSelect
                    size="small"
                    name="chooseContact"
                    options={extContactOptions}
                  />
                </Grid>
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ContactsEditorDrawer;
