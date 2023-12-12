import { Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import {
  contactsArray,
  contactsDefaultValues,
  contactsValidationSchema,
} from './AllContactDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';
import AllContacts from './AllContacts';
import GroupContacts from './GroupContacts';

const AddContactDrawer = (props: any) => {
  const { isDrawerOpen, onClose } = props;

  const methods: any = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: contactsDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const radioVal = watch('contacts');

  const onSubmit = async (data: any) => {
    alert(data);
  };

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
          {radioVal === 'all' ? <AllContacts /> : <GroupContacts />}
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddContactDrawer;
