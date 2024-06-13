import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { contactsArray } from './AllContactDrawer.data';
import { v4 as uuidv4 } from 'uuid';
import AllContacts from './AllContacts';
import GroupContacts from './GroupContacts';
import { ROLES_ACCORDION_DETAILS } from '@/constants/strings';
import useAddContactDrawer from './useAddContactDrawer';

const AddContactDrawer = (props: any) => {
  const {
    isDrawerOpen,
    onClose,
    selectedRec,
    setSelectedRec,
    setSelectedContactsData,
  } = props;
  const { onSubmit, handleSubmit, radioVal, methods } = useAddContactDrawer(
    onClose,
    setSelectedContactsData,
    selectedRec,
  );

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
