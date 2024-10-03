import React from 'react';
import PageHeader from './PageHeader';
import { Box, Typography } from '@mui/material';
import { styles } from './Form.styles';
import useForm from './useForm';
import FormField from './FormField';
import Loader from '@/components/Loader';

export default function Form() {
  const { data, isLoading, isFetching } = useForm();

  return (
    <>
      <PageHeader />
      <Box sx={styles?.content}>
        <Box sx={styles?.heading}>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            {data?.data?.form?.name}
          </Typography>
        </Box>
        <Box sx={styles?.container}>
          <Box
            sx={{
              borderRadius: '5px',
              padding: '20px',
              backgroundColor:
                data?.data?.form?.styling?.body?.backgroundColor ?? '#ffffff',
              color: data?.data?.form?.styling?.body?.color ?? 'inherit',
              fontSize: data?.data?.form?.styling?.body?.fontSize ?? '16px',
            }}
          >
            <form
              autoComplete="off"
              method="POST"
              action={''}
              encType="multipart/form-data"
            >
              {data?.data?.fields?.map((field: any) => (
                <FormField
                  key={field?._id}
                  field={field}
                  buttonStyle={data?.data?.form?.styling?.button}
                />
              ))}
            </form>
          </Box>
        </Box>

        <Loader isLoading={isLoading || isFetching} />
      </Box>
    </>
  );
}
