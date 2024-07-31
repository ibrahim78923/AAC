import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { contactsArray } from './AllContactDrawer.data';
import { v4 as uuidv4 } from 'uuid';
import AllContacts from './AllContacts';
import GroupContacts from './GroupContacts';
import { ROLES_ACCORDION_DETAILS } from '@/constants/strings';
import useAddContactDrawer from './useAddContactDrawer';
import { AddContactDrawerProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';

const AddContactDrawer = (props: AddContactDrawerProps) => {
  const {
    isDrawerOpen,
    onClose,
    selectedRec,
    setSelectedRec,
    setSelectedContactsData,
  } = props;

  const {
    onSubmit,
    handleSubmit,
    radioVal,
    methods,
    allContactsData,
    setPageLimit,
    setPage,
  } = useAddContactDrawer(onClose, setSelectedContactsData, selectedRec);

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
        {radioVal === ROLES_ACCORDION_DETAILS?.ALL ? (
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
