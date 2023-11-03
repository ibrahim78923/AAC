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
    handleApprovalModelClose,
    openApprovalModal,
    handleRejectModelClose,
    openRejectModal,
    handleRejectModelOpen,
    handleApprovalModelOpen,
    methods,
  } = useRequestApprovalPage();

  const Icons: any = {
    Request: <SharedIcon />,
  };
  return (
    <>
      <Box sx={styles?.approvalsContainerBox}>
        {requestApprovalPageData
          ?.filter((item) => item?.status === 'Request')
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
                        onClick={handleApprovalModelOpen}
                        startIcon={
                          <CheckCircleIcon
                            sx={{ color: theme?.palette?.success?.main }}
                          />
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={handleRejectModelOpen}
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
        onClose={handleApprovalModelClose}
      >
        <Box width={'100%'} p={'1rem'}>
          <Box sx={styles?.dialogBoxStyle}>
            <Typography variant="h5">Approval</Typography>
            <AlertModalCloseIcon
              onClick={handleApprovalModelClose}
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
            <Button variant="outlined" onClick={handleApprovalModelClose}>
              Cancel
            </Button>
            <Button variant="contained">Approve</Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog fullWidth open={openRejectModal} onClose={handleRejectModelClose}>
        <Box width={'100%'} p={'1rem'}>
          <Box sx={styles?.dialogBoxStyle}>
            <Typography variant="h5">Approval</Typography>
            <AlertModalCloseIcon
              onClick={handleRejectModelClose}
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
              onClick={handleRejectModelClose}
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
