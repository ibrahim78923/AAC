import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddNewMessage } from './useAddNewMessage';
import { RecordAudio } from './RecordAudio';

const AddNewMessage = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    cancelAddNewMessageForm,
    addNewMessageFormFields,
    value,
    handleChange,
  } = useAddNewMessage(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="New Message"
      okText="Add message"
      cancelText="cancel"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => cancelAddNewMessageForm?.()}
    >
      <Box mt={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              marginRight: '30px',
            },
            mb: 2,
          }}
        >
          <Tab label="Text Type" />
          <Tab label="Uploading Type" />
          <Tab label="Voice Type" />
        </Tabs>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {addNewMessageFormFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
                {value === 2 && (
                  <Box mt={2}>
                    <RecordAudio />
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddNewMessage;
