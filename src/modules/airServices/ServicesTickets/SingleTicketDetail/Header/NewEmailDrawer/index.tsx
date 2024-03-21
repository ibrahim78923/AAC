import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import React from 'react';
import { useNewEmailDrawer } from './useNewEmail';
import { addEmailDataArray } from './NewEmailDrawer.data';

export const NewEmailDrawer = (props: any) => {
  const { methods, handleSubmit, onSubmit, isDrawerOpen, onClose } =
    useNewEmailDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title={'New Email'}
      isOk
      okText={'Send'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {addEmailDataArray?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
