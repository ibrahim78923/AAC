import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { useUpsertContract } from './useUpsertContract';
import { Box, Button, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const UpsertContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    theme,
    upsertContractFormFieldsData,
  } = useUpsertContract();
  return (
    <>
      <Grid
        container
        // sx={{
        //   border:  '1px solid rgba(98, 110, 142, 0.12) ',
        //   borderRadius: '12px',
        //   padding: '20px',
        // }}
        border={{
          xs: `2px solid ${theme?.palette?.custom?.off_white_three}`,
          md: 'none',
        }}
        borderRadius={{ xs: 3, md: 0 }}
        padding={{ xs: 1.5, md: 0 }}
      >
        <Grid
          item
          xs={12}
          md={7.5}
          border={{
            md: `2px solid ${theme?.palette?.custom?.off_white_three}`,
            xs: 'none',
          }}
          borderRadius={{ md: 2, xs: 0 }}
          padding={{ md: 1.5, xs: 0 }}
        >
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertContractForm)}
          >
            <Grid container spacing={4}>
              {upsertContractFormFieldsData?.map((item: any) => (
                <Grid item xs={12} lg={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.componentProps?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : item?.heading
                      ? item?.heading
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
        <Grid item xs={12} md={0.5}></Grid>
        <Grid item xs={12} md={4} mt={1} mb={1}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertContractForm)}
          >
            <RHFDropZone name="attachment" />
          </FormProvider>
        </Grid>
        <br />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box></Box>
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
