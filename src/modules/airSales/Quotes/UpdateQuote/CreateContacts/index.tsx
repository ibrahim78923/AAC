import { Box, Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { contactsDataArray } from './CreateContactsdata';

import { v4 as uuidv4 } from 'uuid';
import useCreateContacts from './useCreateContacts';

const CreateContacts = ({ open, onClose }: any) => {
  const {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    userList,
  } = useCreateContacts();

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Contact"
      footer
      okText="Create"
      submitHandler={handleSubmit(onSubmit)}
      isOk
    >
      <Box sx={{ pt: 2 }}>
        <FormProvider
          methods={methodscontacts}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            {contactsDataArray(
              lifeCycleStagesData,
              contactStatusData,
              userList,
            )?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
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
