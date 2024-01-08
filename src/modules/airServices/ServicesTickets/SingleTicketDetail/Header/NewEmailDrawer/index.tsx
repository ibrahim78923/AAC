import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, ToggleButton } from '@mui/material';
import React from 'react';
import { useNewEmailDrawer } from './useNewEmail';
import { addEmailDataArray } from './NewEmailDrawer.data';
import Image from 'next/image';

export const NewEmailDrawer = (props: any) => {
  const { methods, handleSubmit, onSubmit, isDrawerOpen, onClose } =
    useNewEmailDrawer(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title="New Email"
      submitHandler={handleSubmit(onSubmit)}
      footer={true}
      isOk={true}
      okText="Send"
    >
      <FormProvider methods={methods}>
        <Grid container spacing={4}>
          {addEmailDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={item.id} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : item?.buttonGroup
                    ? item?.options?.map((option: any) => (
                        <ToggleButton
                          sx={{
                            border: '1.5px solid grey.700 !important',
                            borderRadius: '8px !important',
                            p: '10px 16px !important',
                            color: 'grey.900',
                            fontSize: '14px',
                            fontWeight: '400',
                            gap: '0.3rem',
                            '&.Mui-selected': {
                              bgcolor: 'primary.light',
                              '&:hover': {
                                bgcolor: 'primary.light',
                              },
                            },
                          }}
                          key={item.id}
                          value={option?.value}
                        >
                          <Image src={option?.img} alt={option?.value} />
                          {option?.label}
                        </ToggleButton>
                      ))
                    : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
