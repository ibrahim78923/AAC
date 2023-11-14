import React from 'react';

import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { dataArray } from './UploadFiles.data';

import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

const UploadFiles = () => {
  const methods: any = useForm({});
  const theme = useTheme<Theme>();

  return (
    <>
      <Box
        sx={{
          backgroundColor: `${theme?.palette?.slateBlue?.main}`,
          width: '72px',
          padding: '7px',
          fontWeight: 400,
          fontSize: '12px',
          color: 'white',
          borderRadius: '16px',
        }}
      >
        Step 1 of 2
      </Box>
      <Box sx={{ paddingTop: '1rem' }}>
        <Typography
          variant="h6"
          sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
        >
          Uploaded file must have these columns
        </Typography>
        <ul
          style={{
            paddingLeft: '18px',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
          }}
        >
          <li
            style={{
              color: `${theme?.palette?.grey[900]}`,
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            Name
          </li>
          <li
            style={{
              color: `${theme?.palette?.grey[900]}`,
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            Deal Value
          </li>
        </ul>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: `${theme?.palette?.grey[600]}` }}
        >
          Import Companies
        </Typography>
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
};

export default UploadFiles;
