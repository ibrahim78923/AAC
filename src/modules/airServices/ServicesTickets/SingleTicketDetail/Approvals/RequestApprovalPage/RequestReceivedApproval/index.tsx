import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { requestApprovalPageData } from '../RequestApprovalPage.data';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { AlertModalCloseIcon } from '@/assets/icons';
import { styles } from '../RequestApprovalPage.style';

const RequestReceivedApproval = () => {
  const {
    theme,
    textColor,
    handleApprovalModalClose,
    openApprovalModal,
    handleRejectModalClose,
    openRejectModal,
    handleRejectModalOpen,
    handleApprovalModalOpen,
    methods,
  } = useRequestApprovalPage();

  const Icons: any = {
    Request: <SharedIcon />,
  };
  return (
    <>
      <Box sx={styles?.approvalsContainerBox}>
        {requestApprovalPageData
          ?.filter((item: any) => item?.status === 'Request')
          ?.map((filteredItem) => {
            return (
              <Box key={filteredItem?.id} sx={styles?.approvalsContainer}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Grid item>
                    <Box sx={styles?.requestApprovalBoxFirst}>
                      <Box>
                        <Image src={filteredItem?.img} alt="Avatar" />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={theme?.typography?.fontWeightMedium}
                        >
                          {filteredItem?.mainText}
                        </Typography>
                        <Box sx={styles?.requestApprovalBoxSecond}>
                          {Icons[filteredItem?.status]}
                          <span>
                            <Typography
                              variant="customStyle"
                              color={textColor[filteredItem?.status]}
                            >
                              {filteredItem?.iconText}
                            </Typography>
                          </span>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="customStyle"
                      color={theme?.palette?.common?.black}
                    >
                      {filteredItem?.detail}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box sx={styles?.requestApprovalBoxFirst}>
                      <Button
                        variant="outlined"
                        onClick={handleApprovalModalOpen}
                        startIcon={
                          <CheckCircleIcon
                            sx={{ color: theme?.palette?.success?.main }}
                          />
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={handleRejectModalOpen}
                        variant="outlined"
                        color="error"
                        startIcon={
                          <CancelIcon
                            sx={{ color: theme?.palette?.error?.main }}
                          />
                        }
                      >
                        Reject
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
      </Box>
      <Dialog
        fullWidth
        open={openApprovalModal}
        onClose={handleApprovalModalClose}
      >
        <Box width={'100%'} p={'1rem'}>
          <Box sx={styles?.dialogBoxStyle}>
            <Typography variant="h5">Approval</Typography>
            <AlertModalCloseIcon
              onClick={handleApprovalModalClose}
              style={{ cursor: 'pointer' }}
            />
          </Box>
          <FormProvider methods={methods}>
            <RHFTextField
              name="description"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
          </FormProvider>
          <Box sx={styles?.boxBorderStyle}></Box>
          <Box sx={styles?.buttonBox}>
            <Button variant="outlined" onClick={handleApprovalModalClose}>
              Cancel
            </Button>
            <Button variant="contained">Approve</Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog fullWidth open={openRejectModal} onClose={handleRejectModalClose}>
        <Box width={'100%'} p={'1rem'}>
          <Box sx={styles?.dialogBoxStyle}>
            <Typography variant="h5">Approval</Typography>
            <AlertModalCloseIcon
              onClick={handleRejectModalClose}
              style={{ cursor: 'pointer' }}
            />
          </Box>
          <FormProvider methods={methods}>
            <RHFTextField
              name="description"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
          </FormProvider>
          <Box sx={styles?.boxBorderStyle}></Box>
          <Box sx={styles?.buttonBox}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleRejectModalClose}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error">
              Reject
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default RequestReceivedApproval;
