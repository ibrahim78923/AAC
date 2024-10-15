import React from 'react';
import { Box, Grid, Button, Skeleton, useTheme } from '@mui/material';
import useEmbedCode from './useEmbedCode';
import { generateFormFieldsData } from '@/utils/leadcapture-forms';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';

export default function EmbedCode() {
  const theme = useTheme();
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    methods,
    handleSubmit,
    handlerOnSubmit,
  } = useEmbedCode();
  const fieldsData = data ? data?.data?.fields : [];
  const formFields = generateFormFieldsData(fieldsData);

  return (
    <>
      {(isLoading || isFetching) && (
        <Grid container spacing={'20px'}>
          {Array(4)
            .fill(null)
            .map(() => (
              <Grid item xs={12} key={uuidv4()}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={'100%'}
                  height={100}
                  sx={{
                    bgcolor: theme?.palette?.grey?.[300],
                    borderRadius: '6px',
                  }}
                />
              </Grid>
            ))}
        </Grid>
      )}
      {isError && <ApiErrorState />}

      {!(isLoading || isFetching) &&
        isSuccess &&
        data &&
        (data?.data?.fields?.length === 0 ? (
          <NoData />
        ) : (
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
                  <Button
                    type={'submit'}
                    variant={'contained'}
                    className={'small'}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        ))}
    </>
  );
}
