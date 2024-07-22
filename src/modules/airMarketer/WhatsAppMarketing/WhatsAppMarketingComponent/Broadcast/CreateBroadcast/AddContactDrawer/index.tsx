import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { contactsArray } from './AllContactDrawer.data';
import { v4 as uuidv4 } from 'uuid';
import AllContacts from './AllContacts';
import GroupContacts from './GroupContacts';
import useAddContactDrawer from './useAddContactsDrawer';
import { useEffect } from 'react';
import { SMS_MARKETING_CONSTANTS } from '@/constants/strings';

const AddContactDrawer = (props: any) => {
  const {
    setSelectedContactsData,
    setSelectedRec,
    isDrawerOpen,
    selectedRec,
    onClose,
  } = props;

  const { onSubmit, handleSubmit, radioVal, methods } = useAddContactDrawer(
    onClose,
    setSelectedContactsData,
    selectedRec,
  );

  useEffect(() => {
    setSelectedRec([]);
  }, [radioVal]);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title="Add Contacts"
      okText="Add"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <Box>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {contactsArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          {radioVal === SMS_MARKETING_CONSTANTS?.ALL ? (
            <AllContacts
              setSelectedRec={setSelectedRec}
              selectedRec={selectedRec}
            />
          ) : (
            <GroupContacts
              setSelectedRec={setSelectedRec}
              selectedRec={selectedRec}
            />
          )}
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddContactDrawer;
