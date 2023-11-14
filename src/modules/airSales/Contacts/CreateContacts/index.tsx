import { useForm } from 'react-hook-form';

import { Grid, MenuItem, Typography, useTheme } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { createContactsData } from './CreateContactsdata';

import { v4 as uuidv4 } from 'uuid';

const CreateContacts = ({ open, onClose }: any) => {
  const methods = useForm({});
  const theme = useTheme();

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Contact"
      footer
      okText="Create"
      isOk
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} gap={'7px'}>
          {createContactsData?.map((obj) => (
            <Grid item xs={12} key={uuidv4()}>
              <Typography
                sx={{
                  colors: theme?.palette?.grey[600],
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                {obj?.title}
              </Typography>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj?.options?.map((option) => (
                      <MenuItem key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))
                  : null}
              </obj.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateContacts;
