import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { dataArray } from './EmailSetting.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './EmailSetting.styles';

const EmailSetting = () => {
  const methods = useForm({});
  const theme = useTheme();

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2}>
        {dataArray?.map((item) => (
          <Grid item xs={12} key={uuidv4()}>
            <Typography
              variant="body4"
              sx={{ colors: theme?.palette?.grey[600], fontSize: '14px' }}
            >
              {item?.label}
            </Typography>
            <item.component {...item?.componentProps} size={'small'}>
              {item?.componentProps?.select &&
                item?.options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
            </item.component>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box sx={styles?.emailWrap}>
            <Typography variant="body2">John@dummy.com</Typography>
          </Box>
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="h5">Team Signature</Typography>
            <Button variant="text" sx={{ my: 1 }}>
              Add Team Signature
            </Button>
            <br />
            <TextField
              size="small"
              placeholder="Sans Serif"
              label="Font Name"
            />
            <TextField
              size="small"
              placeholder="11pt"
              label="Font Size"
              sx={{ ml: 1 }}
            />
            <Box sx={styles?.emailBoxWrap}>
              <Typography variant="h2" sx={{ fontSize: '16px !important' }}>
                Preview
              </Typography>
              <Typography sx={styles?.previewWrap}>
                What contacts will see in the ‘from address’ when they receive
                an email from this shared email address
              </Typography>
              <Box sx={styles?.sendEmail}>
                <Box>
                  <Typography variant="h2" sx={{ fontSize: '14px !important' }}>
                    standard-sandbox-1.orcalo.co.uk
                  </Typography>
                  <Typography variant="customStyle" sx={{ color: '#6B7280' }}>
                    support@standard-sandbox-1.orcalo.co.uk.eu.eu1.r.hs-inbox.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EmailSetting;
