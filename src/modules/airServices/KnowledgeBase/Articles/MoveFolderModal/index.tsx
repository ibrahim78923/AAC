import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModalCloseIcon } from '@/assets/icons';
import { moveFolderFields } from './MoveFolderModal.data';
import { useMoveFolderModal } from './useMoveFolderModal';
import { LoadingButton } from '@mui/lab';

export const MoveFolderModal = ({
  moveFolderModal,
  setMoveFolderModal,
}: any) => {
  const { modalSubmitHandler, methodMoveFolderForm, submitMoveFolder } =
    useMoveFolderModal();
  return (
    <Dialog
      open={moveFolderModal}
      onClose={() => setMoveFolderModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box maxWidth={580} width="100%" padding="24px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3">Move to other folder</Typography>
          <AlertModalCloseIcon
            onClick={() => setMoveFolderModal(false)}
            style={{ cursor: 'pointer' }}
          />
        </Box>
        <Box mt={2}>
          <FormProvider
            methods={methodMoveFolderForm}
            onSubmit={methodMoveFolderForm.handleSubmit(submitMoveFolder)}
          >
            <Grid container spacing={1}>
              {moveFolderFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
        <Box display={'flex'} justifyContent={'flex-end'} gap={1} mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setMoveFolderModal(false)}
          >
            Cancel
          </Button>
          <LoadingButton variant="contained" onClick={modalSubmitHandler}>
            Move
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};
