import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { conversationModelsArray } from '../Conversation.data';
import CommonDrawer from '@/components/CommonDrawer';

const ConversationNote = ({
  // selectedItem,
  show,
  setShow,
  addCoversationModel,
  onSubmit,
}: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={show}
      onClose={() => setShow(false)}
      okText={'Add Note'}
      footer={true}
      isOk={true}
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
              mb={item.mb ? item.mb : ''}
            >
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  options={item.options}
                >
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* <Box
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
        </Box> */}
      </FormProvider>
    </CommonDrawer>
  );
};

export default ConversationNote;
