import { Grid, Typography, Box, Button } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useUpdateContract } from './useUpdateContract';
import { updateContractFormFields } from './UpdateContract.data';

export const UpdateContract = () => {
  const {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    handleContractClick,
    submitHandlerUpdateContractForm,
    router,
    convertToTitleCase,
  } = useUpdateContract();

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        display={'flex'}
        flexDirection={'row'}
        padding={2}
      >
        <Grid
          item
          xs={9}
          sx={{
            border: '1px solid rgba(98, 110, 142, 0.12) ',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ height: '700px', overflow: 'auto' }}>
            <Box sx={{ mb: '1rem' }}>
              <Typography variant="h5">
                {`${convertToTitleCase(router?.query?.action)} Contract`}
              </Typography>
            </Box>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(submitUpdateContractForm)}
            >
              <Grid container spacing={4}>
                {updateContractFormFields?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select ? (
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      ) : item?.heading ? (
                        item?.heading
                      ) : (
                        <></>
                      )}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </div>
        </Grid>

        <Grid item xs={3}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpdateContractForm)}
          >
            <RHFDropZone name="attachment" />
          </FormProvider>
        </Grid>
        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Box sx={{ mr: '1rem' }}>
            <Button type="submit" onClick={handleContractClick}>
              cancel
            </Button>
          </Box>
          <Box sx={{ ml: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandlerUpdateContractForm}
              type="submit"
            >
              {`${convertToTitleCase(router?.query?.action)}`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
