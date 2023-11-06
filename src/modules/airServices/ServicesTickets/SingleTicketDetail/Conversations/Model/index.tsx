import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid } from '@mui/material';
import ConversationModel from '@/components/Model/CoversationModel';
import { v4 as uuidv4 } from 'uuid';
import { conversationModelsArray } from '../Conversation.data';

const ConversationModelSub = ({
  selectedItem,
  show,
  setShow,
  addCoversationModel,
  onSubmit,
}: any) => {
  return (
    <ConversationModel
      selectedItem={selectedItem}
      open={show}
      handleClose={() => setShow(false)}
    >
      <FormProvider
        methods={addCoversationModel}
        onSubmit={addCoversationModel.handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          {conversationModelsArray?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={uuidv4()}
              mb={item?.mb ? item?.mb : ''}
            >
              <item.component {...item.componentProps} />
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
          <Button sx={{ maxWidth: '90px' }} variant="contained" type={'submit'}>
            Add
          </Button>
        </Box>
      </FormProvider>
    </ConversationModel>
  );
};

export default ConversationModelSub;
