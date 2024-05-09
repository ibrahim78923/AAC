import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import {
  FormProvider,
  RHFCheckbox,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './draft.styles';
import { options } from '../../../SendEmail/SendEmailDrawer.data';
import { emailDraftValidationsSchema } from './draft.data';
import { yupResolver } from '@hookform/resolvers/yup';

const Draft = () => {
  const methods = useForm({
    resolver: yupResolver(emailDraftValidationsSchema),
    defaultValues: {
      to: 'sdsd',
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    values;
  };

  return (
    <Box>
      <Box sx={styles?.draftWrap}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <RHFTextField
                name="to"
                label="to"
                size="small"
                required={false}
              />
            </Grid>

            <Grid item xs={2} sx={{ mt: 3 }}>
              <RHFCheckbox name="fromChecked" label="From" />
            </Grid>
            <Grid item xs={2} sx={{ mt: 3 }}>
              <RHFCheckbox name="ccChecked" label="CC" />
            </Grid>
            <Grid item xs={2} sx={{ mt: 3 }}>
              <RHFCheckbox name="bccChecked" label="BCC" />
            </Grid>

            <Grid item xs={6}>
              <RHFTextField name="subject" label="Subject" size="small" />
            </Grid>

            <Grid item xs={6}>
              <RHFSelect name="template" label="Template" size="small">
                {options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>

            <Grid item xs={12}>
              <RHFEditor
                name="description"
                label="Description"
                required={true}
              />
            </Grid>

            <Grid item xs={12}>
              <RHFDropZone name="attachFile" label="Attachments" />
            </Grid>

            <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
              <Button>Cancel</Button>
              <Button variant="contained" onSubmit={handleSubmit(onSubmit)}>
                Send
              </Button>
            </Box>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Draft;
