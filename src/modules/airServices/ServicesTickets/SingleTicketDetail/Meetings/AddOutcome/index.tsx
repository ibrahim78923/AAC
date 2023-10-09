import ConversationModel from '@/components/Model/CoversationModel';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Button } from '@mui/material';
import { addOutcomeArray } from './AddOutcome.data';
import { v4 as uuidv4 } from 'uuid';

export const AddOutcomeModal = ({
  show,
  setShow,
  addCoversationModel,
  onSubmit,
}: any) => {
  return (
    <>
      <ConversationModel
        selectedItem={'Outcome'}
        open={show}
        handleClose={() => setShow(false)}
      >
        <FormProvider
          methods={addCoversationModel}
          onSubmit={addCoversationModel.handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            {addOutcomeArray?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                mb={item.mb ? item.mb : ''}
              >
                <item.component {...item.componentProps}>
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
          </Grid>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: '16px',
              mt: '16px',
              gap: '10px',
            }}
          >
            <Button
              sx={{ maxWidth: '90px' }}
              variant="outlined"
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
            <Button
              sx={{ maxWidth: '90px' }}
              variant="contained"
              type={'submit'}
            >
              Save
            </Button>
          </Box>
        </FormProvider>
      </ConversationModel>
    </>
  );
};
