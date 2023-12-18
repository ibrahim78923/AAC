import { Box, Grid, Typography } from '@mui/material';
import { useChangeEmail } from './useChangeEmail';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ChangeEmail = () => {
  const {
    ChangeEmailMethods,
    reset,
    handleSubmitChangeEmail,
    theme,
    changeEmailFields,
  } = useChangeEmail();
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
          <Typography variant="h6">Change Email</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider
            methods={ChangeEmailMethods}
            onSubmit={handleSubmitChangeEmail}
          >
            <Grid
              container
              spacing={1}
              display={'flex'}
              flexDirection={'column'}
            >
              {changeEmailFields?.map((item: any) => (
                <Grid item xs={12} sm={item?.gridLength} key={item?._id}>
                  <item.component {...item?.componentProps} />
                </Grid>
              ))}
            </Grid>
            <Box display={'flex'} justifyContent={'end'} gap={1}>
              <LoadingButton variant="contained" type="submit">
                Verify
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
