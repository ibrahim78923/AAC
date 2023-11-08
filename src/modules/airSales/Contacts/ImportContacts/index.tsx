import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import {
  customDefaultValues,
  customValidationSchema,
  importContactsData,
} from './ImportCreated.data';

import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useImportDeal from './useImportCreated';
import { useRouter } from 'next/router';
import { SUPER_ADMIN } from '@/constants';

import { ImportIcon } from '@/assets/icons';

const ImportContacts = () => {
  const route = useRouter();
  const theme = useTheme();
  const { isColumn } = useImportDeal();

  const methods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3">Import Contacts</Typography>
        <Button
          onClick={() => {
            route.push(SUPER_ADMIN.AIRSALES_IMPORTHISTORY);
          }}
          startIcon={<ImportIcon />}
          variant="outlined"
        >
          Import History
        </Button>
      </Box>
      <Box textAlign="center" mt="19px">
        <Button variant="text">step {isColumn ? '2' : '1'} of 2</Button>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: theme.palette.custom['main'],
            my: '10px',
          }}
        >
          {isColumn
            ? 'Map Columns from your file to the right CRM fields. Your 5 unmapped columns won’t be imported'
            : 'Import contacts using your own file, or use our Sample .'}
        </Typography>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {importContactsData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component size={'small'} {...item?.componentProps}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                {item?.componentProps?.heading && (
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
          <Box textAlign="end">
            <Button
              variant="outlined"
              onClick={() => {
                route.push(SUPER_ADMIN?.AIRSALES_CONTCATS);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ ml: '10px' }}
              onClick={() => route.push(SUPER_ADMIN?.CONTCATS_COLUMN)}
            >
              Next
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default ImportContacts;
