import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { CloseModalIcon, PlusSharedIconColor } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { addExpenseFormData } from '../Expense.data';

export const AddExpense = ({ addExpenseProps }: any) => {
  const {
    addExpenseModalTitle,
    methods,
    onAddExpenseSubmit,
    isAddExpenseModalOpen,
    handleAddExpenseModal,
  } = addExpenseProps;

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PlusSharedIconColor />}
        onClick={() => handleAddExpenseModal?.(true)}
      >
        Add New Expense
      </Button>
      {isAddExpenseModalOpen && (
        <Dialog
          open={isAddExpenseModalOpen}
          onClose={() => handleAddExpenseModal?.()}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 440,
              borderRadius: 20,
            },
          }}
        >
          <FormProvider
            methods={methods}
            onSubmit={methods?.handleSubmit?.(onAddExpenseSubmit)}
          >
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2.4,
              }}
            >
              <Typography variant="h4" color="primary?.main">
                {addExpenseModalTitle}
              </Typography>
              <Box
                onClick={() => handleAddExpenseModal?.()}
                sx={{ cursor: 'pointer' }}
              >
                <CloseModalIcon />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container gap={2.4}>
                {addExpenseFormData?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                    <form.component {...form?.componentProps} size="small">
                      {form?.componentProps?.select
                        ? form?.componentProps?.options?.map((option: any) => (
                            <option key={uuidv4()} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : null}
                    </form.component>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <Button
                  onClick={() => handleAddExpenseModal?.()}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  save
                </Button>
              </Box>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
