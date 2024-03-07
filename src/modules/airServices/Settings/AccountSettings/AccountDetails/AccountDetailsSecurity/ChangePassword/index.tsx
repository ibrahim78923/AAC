import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, Typography } from '@mui/material';
import { useChangePassword } from './useChangePassword';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';

export const ChangePassword = () => {
  const {
    changePasswordFields,
    ChangePasswordMethods,
    reset,
    handleSubmitChangePassword,
    theme,
    isLoading,
  } = useChangePassword();
  return (
    <Box
      borderBottom={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={2.5}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider
            methods={ChangePasswordMethods}
            onSubmit={handleSubmitChangePassword}
          >
            <Grid
              container
              spacing={1}
              display={'flex'}
              flexDirection={'column'}
            >
              {changePasswordFields?.map((item: any) => (
                <Grid item xs={12} sm={item?.gridLength} key={item?._id}>
                  <item.component {...item?.componentProps} />
                </Grid>
              ))}
            </Grid>
            <Box display={'flex'} justifyContent={'end'} gap={1}>
              <LoadingButton
                disabled={isLoading}
                variant="contained"
                type="submit"
              >
                Save
              </LoadingButton>
              <LoadingButton variant="outlined" onClick={() => reset()}>
                cancel
              </LoadingButton>
            </Box>
          </FormProvider>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
