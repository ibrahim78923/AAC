import React from 'react';
import PageHeader from '../components/PageHeader';
import { Box, Typography, Grid } from '@mui/material';
import { styles } from './Form.styles';
import useFormHook from './useForm';
import Loader from '@/components/Loader';
import { generateFormFieldsData } from '@/utils/leadcapture-forms';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';

export default function Form() {
  const {
    data,
    isLoading,
    isFetching,
    methods,
    handleSubmit,
    handlerOnSubmit,
    loadingFormSubmission,
  } = useFormHook();
  const fieldsData = data ? data?.data?.fields : [];
  const formFields = generateFormFieldsData(fieldsData);

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
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(handlerOnSubmit)}
            >
              <Grid container spacing={'20px'}>
                {formFields?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
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
                <Grid item xs={12}>
                  <LoadingButton
                    type={'submit'}
                    variant={'contained'}
                    className={'small'}
                    loading={loadingFormSubmission}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        </Box>

        <Loader isLoading={isLoading || isFetching} />
      </Box>
    </>
  );
}
