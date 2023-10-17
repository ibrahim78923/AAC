import { Grid, Typography, Box, Button } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';
import { contractsEditArray } from './ContractsEdit.data';
import useContractsActionEdit from './useContractsActionEdit';
import UploadAttachments from './UploadAttachment';

import { ContractItemTable } from './RecievedItems/ContractItemTable ';
import { useRouter } from 'next/router';
export const ContractsEdit = () => {
  const { methods, handleSubmit, onSubmit } = useContractsActionEdit();

  const Router = useRouter();
  const submitHandler = methods.handleSubmit(async () => {
    enqueueSnackbar('New Contract form submit successfully', {
      variant: 'success',

      autoHideDuration: 3000,
    });

    Router.push('/air-services/assets/contracts');
  });

  const handleContractClick = () => {
    Router.push('/air-services/assets/contracts');
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        display={'flex'}
        alignItems={'cente'}
        flexDirection={'row'}
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
          <Box sx={{ mb: '1rem' }}>
            <Typography variant="h5"> General Details</Typography>
          </Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {contractsEditArray?.map((item: any) => (
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
                      <ContractItemTable />
                    )}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
        <Grid item xs={3}>
          <UploadAttachments />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Box sx={{ mr: '1rem' }}>
            <Button type="submit" onClick={handleContractClick}>
              cancel
            </Button>
          </Box>
          <Box sx={{ ml: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandler}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
