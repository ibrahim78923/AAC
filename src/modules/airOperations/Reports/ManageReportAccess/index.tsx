import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { useManageReportAccess } from './useManageReportAccess';
import CloseIcon from '@mui/icons-material/Close';
import { ReportsListsComponentPropsI } from '../Reports.interface';

export const ManageReportAccess = (props: ReportsListsComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
  }: any = useManageReportAccess(props);

  return (
    <Dialog
      open={isPortalOpen?.isAccessManage as boolean}
      onClose={() => closeModal?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitAssignedTicketsForm)}
      >
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
            mb={1.5}
          >
            <Typography variant="h4" color="slateBlue.main">
              Manage Access
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => closeModal?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={2}>
            {manageReportAccessFromFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeModal?.()}
            disabled={manageReportAccessStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={manageReportAccessStatus?.isLoading}
            disabled={manageReportAccessStatus?.isLoading}
          >
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
