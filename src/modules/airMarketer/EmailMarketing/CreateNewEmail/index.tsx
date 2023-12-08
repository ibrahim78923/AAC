import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCreateNewEmail } from './useCreateNewEmail';
import { createNewEmailData } from './CreateNewEmail.data';
import AddANote from './AddNote';

const CreateNewEmail = () => {
  const {
    methods,
    onSubmit,
    handleSubmit,
    isBcc,
    setIsBcc,
    isActive,
    setIsActive,
    handleAddNoteDrawer,
    isAddNoteDrawer,
  } = useCreateNewEmail();

  return (
    <>
      <Box sx={styles?.createNewEmailWrap}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Create New Email
        </Typography>
        <Button onClick={handleAddNoteDrawer}>Add a note</Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="space-between"
          >
            {createNewEmailData?.map((item: any) => {
              return (
                item?.isBCCField?.some((val: any) => isBcc?.includes(val)) && (
                  <Grid item xs={12} md={item?.md}>
                    <item.component
                      {...item?.componentProps}
                      key={item?.id}
                      size={'small'}
                    >
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                    {item?.componentProps?.name === 'buttons' && (
                      <Stack
                        direction={'row'}
                        gap={1}
                        justifyContent="end"
                        mt={{ md: 2.7 }}
                      >
                        <Button
                          variant={isActive?.bcc ? 'contained' : 'outlined'}
                          color={isActive?.bcc ? 'primary' : 'inherit'}
                          onClick={() => {
                            const activeNewArray = [...isBcc, 'bcc'];
                            const inActiveNewArray = isBcc.filter(
                              (element) => element !== 'bcc',
                            );
                            setIsActive({ ...isActive, bcc: !isActive?.bcc });
                            setIsBcc(
                              !isActive?.bcc
                                ? activeNewArray
                                : inActiveNewArray,
                            );
                          }}
                        >
                          BCC
                        </Button>
                        <Button
                          variant={isActive?.cc ? 'contained' : 'outlined'}
                          color={isActive?.cc ? 'primary' : 'inherit'}
                          onClick={() => {
                            const activeNewArray = [...isBcc, 'cc'];
                            const inActiveNewArray = isBcc.filter(
                              (element) => element !== 'cc',
                            );
                            setIsActive({ ...isActive, cc: !isActive?.cc });
                            setIsBcc(
                              !isActive?.cc ? activeNewArray : inActiveNewArray,
                            );
                          }}
                        >
                          CC
                        </Button>
                      </Stack>
                    )}
                  </Grid>
                )
              );
            })}
          </Grid>
        </FormProvider>
      </Box>
      {isAddNoteDrawer && (
        <AddANote open={isAddNoteDrawer} onClose={handleAddNoteDrawer} />
      )}
    </>
  );
};

export default CreateNewEmail;
const styles = {
  createNewEmailWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emailBcc: {
    color: '#6B7280',
    border: '1px solid #D1D5DB',
    p: '7px 8px',
    width: '72px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  emailBccWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
};
