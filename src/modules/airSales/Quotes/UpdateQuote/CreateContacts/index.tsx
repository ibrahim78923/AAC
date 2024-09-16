import { Box, Grid, Typography } from '@mui/material';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { contactOptions, contactsDataArray } from './CreateContactsdata';
import useCreateContacts from './useCreateContacts';
import { CONTACT_TYPE } from '@/constants';

const CreateContacts = ({ open, onClose, dealId }: any) => {
  const {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStages,
    laodingContactPost,
    UserListData,
    contactsStatus,
    extContactOptions,
    watchContacts,
    theme,
    associationLoading,
  }: any = useCreateContacts(dealId, onClose);

  const contactDataArrayParasm = {
    contactsStatus,
    lifeCycleStages,
    UserListData,
  };

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      cancelBtnHandler={onClose}
      title="Create Contact"
      footer
      okText="Create"
      submitHandler={handleSubmit(onSubmit)}
      isOk
      isLoading={laodingContactPost || associationLoading}
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
              contactsDataArray(contactDataArrayParasm)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
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
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={theme?.palette?.grey[600]}
                >
                  Choose Contact{' '}
                  <span style={{ color: theme?.palette?.error?.main }}>*</span>
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
  );
};

export default CreateContacts;
