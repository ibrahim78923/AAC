import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider } from '@/components/ReactHookForm';
import { assignCategoryField } from './SoftwareAssignCategory.data';
import { useSoftwareAssignCategory } from './useSoftwareAssignCategory';

export const SoftwareAssignCategory = ({
  openAssignModal,
  setOpenAssignModal,
}: any) => {
  const { onSubmit, handleSubmit, methods } =
    useSoftwareAssignCategory(setOpenAssignModal);

  return (
    <Dialog open={openAssignModal} onClose={() => setOpenAssignModal(false)}>
      <Box width={{ sm: '26rem' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} p={2}>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography variant="h4">Assign Category</Typography>
              <CloseIcon
                sx={{ color: 'custom.darker', cursor: 'pointer' }}
                onClick={() => setOpenAssignModal(false)}
              />
            </Grid>
            {assignCategoryField?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'flex-end'}
              gap={1}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenAssignModal(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Assign
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Dialog>
  );
};
