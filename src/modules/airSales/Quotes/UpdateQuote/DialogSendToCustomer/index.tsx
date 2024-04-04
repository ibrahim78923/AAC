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
import useUpdateQuote from '../useUpdateQuote';
import {
  usePostAttachmentQuoteMutation,
  useUpdateQuoteSubmisionMutation,
} from '@/services/airSales/quotes';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';

const DialogSendToCustomer: FC<DialogSendToCustomerI> = ({ open, onClose }) => {
  const router = useRouter();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });
  const { handleSubmit } = methods;
  const { quoteId, dataGetQuoteById } = useUpdateQuote();
  const [updateQuoteSubmision] = useUpdateQuoteSubmisionMutation();
  const [postAttachmentQuote] = usePostAttachmentQuoteMutation(); //used in future

  const onSubmit = async (values: { email: string }) => {
    const invoice: any = new jsPDF('portrait', 'px', 'a1');
    const style = document.createElement('style');
    style.innerHTML = `
        #quote-invoice {
            margin: 10px;
            width: 95.8%;
        }`;
    document.head.appendChild(style);
    invoice.html(document.getElementById('quote-invoice'))?.then(() => {
      const pdfBlob = invoice?.output('blob');
      document.head.removeChild(style);

      const formData = new FormData();
      formData.append('fileUrl', pdfBlob);
      formData.append('module', 'QUOTE');
      formData.append('recordType', 'quotes');
      formData.append('recordId', quoteId);
      const body = {
        id: quoteId,
        isSubmitted: true,
        email: values?.email,
        quoteNumber: dataGetQuoteById?.data?.createdBy?._id,
        validTill: dayjs(dataGetQuoteById?.data?.expiryDate)?.format(
          DATE_FORMAT?.API,
        ),
      };

      try {
        postAttachmentQuote({ body: formData })
          ?.unwrap()
          .then((res: any) => {
            if (res?.data) {
              const newData = {
                ...body,
                contentUrl: {
                  filePath: res?.data?.fileUrl,
                  fileName: res?.data?.originalName,
                },
              };
              updateQuoteSubmision(newData)
                ?.unwrap()
                ?.then((data: any) => {
                  if (data?.data) {
                    enqueueSnackbar('Quote sent successfully', {
                      variant: 'success',
                    });
                    onClose();
                    router?.push(AIR_SALES?.QUOTES);
                  }
                });
            }
          });
      } catch (error) {
        enqueueSnackbar('Error while updating quote', {
          variant: 'error',
        });
      }
    });
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
