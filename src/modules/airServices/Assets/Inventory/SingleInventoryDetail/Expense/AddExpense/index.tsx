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
import { CloseModalIcon, PlusSharedColorIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { addExpenseFormData } from '../Expense.data';
import { LoadingButton } from '@mui/lab';
import { UseFormReturn } from 'react-hook-form';

export const AddExpense = ({
  addExpenseProps,
}: {
  addExpenseProps: {
    addExpenseModalTitle: string;
    isAddExpenseModalOpen: boolean;
    setIsAddExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    methods: UseFormReturn<any>;
    onAddExpenseSubmit: (data: any) => Promise<void>;
    handleAddExpenseModal: (isOpen?: boolean) => void;
    isLoadingExpense: boolean;
    patchExpenseProgress?: any;
  };
}) => {
  const {
    addExpenseModalTitle,
    methods,
    onAddExpenseSubmit,
    isAddExpenseModalOpen,
    handleAddExpenseModal,
    isLoadingExpense,
    patchExpenseProgress,
  } = addExpenseProps;

  return (
    <>
      <Button
        variant="contained"
        className={'small'}
        startIcon={<PlusSharedColorIcon />}
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
              <Typography variant="pageTitle" color="primary?.main">
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
                {addExpenseFormData?.map((form) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size={'small'} />
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
                <LoadingButton
                  onClick={() => handleAddExpenseModal?.()}
                  variant={'outlined'}
                  color={'secondary'}
                  className={'small'}
                  disabled={isLoadingExpense || patchExpenseProgress?.isLoading}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type={'submit'}
                  variant={'contained'}
                  className={'small'}
                  disabled={isLoadingExpense || patchExpenseProgress?.isLoading}
                  loading={isLoadingExpense || patchExpenseProgress?.isLoading}
                >
                  Save
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
