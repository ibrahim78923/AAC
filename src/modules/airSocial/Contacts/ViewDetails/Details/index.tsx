import {
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useDetails from './useDetails';
import { detailsDataArray } from './Details.data';
import { styles } from '../ViewDetails.style';
import { EditProfileIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import Loader from '@/components/Loader';
import { generateImage } from '@/utils/avatarUtils';

const Details = () => {
  const {
    methodsDetails,
    loadingUpdateDetail,
    handleSubmitUpdateContactDetail,
    anchorEl,
    open,
    handleShowMenuClick,
    handleClose,
    contactOwnerData,
    contactStatusData,
    lifeCycleStagesData,
    loadingContactById,
    fetchingContactById,
    contactData,
  } = useDetails();

  const detailsFormFields = detailsDataArray(
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  );

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Details</Typography>
      <Box>
        <Box
          sx={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              border: (theme) => `3px solid ${theme?.palette?.primary.main}`,
              textTransform: 'uppercase',
              width: '150px',
              height: '150px',
              color: (theme) => theme?.palette?.common?.white,
            }}
            src={generateImage(contactData?.profilePicture?.url)}
          >
            {loadingContactById
              ? ''
              : `${contactData?.firstName?.charAt(
                  0,
                )}${contactData?.lastName?.charAt(0)}`}
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: '-10px',
              right: '0',
              height: '42px',
              width: '42px',
              cursor: 'pointer',
            }}
            onClick={handleShowMenuClick}
          >
            <EditProfileIcon />
          </Box>
        </Box>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClose}>Upload Image</MenuItem>
          <MenuItem onClick={handleClose}>Remove Image</MenuItem>
        </Menu>
      </Box>
      <Box sx={styles.horizontalTabsInnnerBox}>
        <Typography variant="h4">Basic Information</Typography>
        <FormProvider methods={methodsDetails}>
          <Grid container spacing={4}>
            {detailsFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <Typography>{item?.label}</Typography>
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
        {/* <Typography sx={{ mt: '24px', mb: '24px' }} variant="h4">
            System Information
          </Typography>
          <Grid container spacing={4}>
            {systemInformationDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography>{item?.label}</Typography>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.placeholder}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Divider sx={{ borderColor: theme?.palette?.grey[700] }} />
            </Grid>
          </Grid> */}

        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 1.5,
            }}
          >
            <ButtonGroup>
              <Button sx={{ height: '35px' }}>Cancel</Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" color="primary">
              <LoadingButton
                type="button"
                sx={{ height: '35px' }}
                onClick={handleSubmitUpdateContactDetail}
                loading={loadingUpdateDetail}
              >
                Update
              </LoadingButton>
            </ButtonGroup>
          </Box>
        </Grid>
      </Box>

      <Loader isLoading={loadingContactById || fetchingContactById} />
    </Box>
  );
};

export default Details;
