import { PageTitledHeader } from '@/components/PageTitledHeader';
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { PlaceHolder } from './PlaceHolder';

export const EditEmailNotification = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const methods = useForm<any>({
    resolver: yupResolver(
      Yup?.object()?.shape({
        subject: Yup?.string()?.required('required'),
        editor: Yup?.string()?.required('required'),
      }),
    ),
    defaultValues: {
      subject: '',
      editor: `<p>Hi {{contact.name_for_email}},</p><p>A new {{helpdesk_name}} account has been created for you.,</p><p>Click the url below to activate your account and select a password!.,</p><p>{{activation_url}}</p><p>If the above URL does not work try copying and pasting it into your browser. If you continue to have problems, please feel free to contact us.,</p><p><br></p><p><br></p><p><strong>Regards,</strong></p><p><span class="ql-cursor">﻿</span>{{helpdesk_name}}</p>`,
    },
  });
  const { handleSubmit, reset } = methods;
  const submitForm = async () => {
    reset();
  };
  return (
    <Box>
      <PageTitledHeader
        title="User Activation Email"
        moveBack={() =>
          router.push({
            pathname: AIR_SERVICES?.EMAIL_NOTIFICATION_SETTINGS,
          })
        }
        canMovedBack
      />
      <Divider />
      <Box mt={3} border={'1px solid lightgrey'} borderRadius={'15px'} p={4}>
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            my={'1.5rem'}
            flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
          >
            <Box display={'flex'} gap={1} alignItems={'center'}>
              <Box mb={1}>
                <Typography>Subject:</Typography>
              </Box>
              <RHFTextField name="subject" size="small" />
            </Box>
            <Box>
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                Insert Placeholders{'>>'}
              </Button>
            </Box>
          </Box>
          <RHFEditor name="editor" style={{ height: '400px ' }} />
          <Box display={'flex'} justifyContent={'end'} gap={1}>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit(submitForm)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit(submitForm)}
            >
              Submit
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
      <PlaceHolder open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};
