import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { contactsArray } from './AllContactDrawer.data';
import { v4 as uuidv4 } from 'uuid';
import AllContacts from './AllContacts';
import GroupContacts from './GroupContacts';
import { SMS_MARKETING_CONSTANTS } from '@/constants/strings';
import useAddContactDrawer from './useAddContactDrawer';
import { AddContactDrawerProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';
import { useEffect } from 'react';

const AddContactDrawer = (props: AddContactDrawerProps) => {
  const {
    isDrawerOpen,
    onClose,
    selectedRec,
    setSelectedRec,
    setSelectedContactsData,
    setRecipientType,
    recipientType,
  } = props;

  const {
    onSubmit,
    handleSubmit,
    radioVal,
    methods,
    allContactsData,
    setPageLimit,
    setPage,
  } = useAddContactDrawer(
    onClose,
    setSelectedContactsData,
    selectedRec,
    recipientType,
  );

  useEffect(() => {
    setRecipientType(radioVal);
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
      <FormProvider methods={methods}>
        <Grid container>
          {contactsArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option
                      key={item?.componentProps?.name}
                      value={option?.value}
                    >
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
        {recipientType === SMS_MARKETING_CONSTANTS?.ALL ? (
          <AllContacts
            setSelectedRec={setSelectedRec}
            selectedRec={selectedRec}
            allContactsData={allContactsData}
            setPageLimit={setPageLimit}
            setPage={setPage}
          />
        ) : (
          <GroupContacts
            setSelectedRec={setSelectedRec}
            selectedRec={selectedRec}
          />
        )}
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddContactDrawer;
