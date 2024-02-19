import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { editNoteFields } from './EditNote.data';

const EditNote = ({
  isDrawerOpen,
  onClose,
  methods,
  isLoading,
  onSubmit,
}: any) => {
  const formFields = editNoteFields();

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title={'Edit Note'}
      okText={'Update'}
      isOk={true}
      isLoading={isLoading}
      submitHandler={onSubmit}
      footer
    >
      <Box sx={{ pt: 2 }}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {formFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
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
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default EditNote;
