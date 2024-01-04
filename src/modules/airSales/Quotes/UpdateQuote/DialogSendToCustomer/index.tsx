import React, { FC } from 'react';
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { DialogSendToCustomerI } from './DialogSendToCustomer.interface';
import { CloseModalIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  formFields,
  validationSchema,
  initValues,
} from './DialogSendToCustomer.data';
import { styles } from './DialogSendToCustomer.style';
import { AIR_SALES } from '@/routesConstants/paths';

const DialogSendToCustomer: FC<DialogSendToCustomerI> = ({ open, onClose }) => {
  const router = useRouter();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Quote sent successfully', {
      variant: 'success',
    });
    onClose();
    router.push(AIR_SALES?.QUOTES);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={styles?.dialog}
    >
      <FormProvider methods={methods}>
        <DialogTitle>
          Send to a customer
          <IconButton onClick={onClose}>
            <CloseModalIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: '12px 24px 24px' }}>
          <Grid container spacing={'32px'}>
            {formFields?.map((item) => (
              <Grid item xs={12} key={item.id}>
                <item.component {...item.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} sx={styles?.btnOutlined}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Send
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default DialogSendToCustomer;
