import { Box, Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { contactsDataArray } from './CreateContactsdata';

import useCreateContacts from './useCreateContacts';

const CreateContacts = ({ open, onClose }: any) => {
  const {
    submitCreateContact,
    methodscontacts,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
  } = useCreateContacts();

  const handelClose = () => {
    onClose();
    reset();
  };

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={handelClose}
      title="Create Contact"
      footer
      okText="Create"
      submitHandler={submitCreateContact(onClose)}
      isOk
    >
      <Box sx={{ pt: 2 }}>
        <FormProvider methods={methodscontacts}>
          <Grid container spacing={2}>
            {contactsDataArray(
              contactOwnerData,
              lifeCycleStagesData,
              contactStatusData,
            )?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
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
  );
};

export default CreateContacts;
