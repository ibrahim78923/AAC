import React from 'react';
import { Grid } from '@mui/material';
import CommonDialog from '@/components/CommonDialog';
import { FormProvider } from '@/components/ReactHookForm';
import { fieldsData } from '../AddFields.data';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: () => void;
}

export default function ModalCreateDataField({
  open,
  onClose,
  methods,
  onSubmit,
}: ModalProps) {
  return (
    <CommonDialog
      title={'New data field'}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Create'}
      cancelText={'Cancel'}
      width={'416px'}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={'22px'}>
          {fieldsData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item.componentProps} size={'small'}>
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
    </CommonDialog>
  );
}
