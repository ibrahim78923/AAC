import { ChangeEvent, createElement } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Avatar,
  Skeleton,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useDetails from './useDetails';
import { detailsDataArray } from './Details.data';
import { styles } from '../ViewDetails.style';
import { EditProfileIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import Loader from '@/components/Loader';
import { generateImage } from '@/utils/avatarUtils';
import { useRouter } from 'next/router';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import { AlertModals } from '@/components/AlertModals';
import { componentMap } from '@/utils/dynamic-forms';
import { API_STATUS } from '@/constants';

const Details = () => {
  const router = useRouter();
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
    orgId,
    handleChangeUploadPhoto,
    isOpenRemoveImageDialog,
    handleOpenRemoveImageDialog,
    handleCloseRemoveImageDialog,
    handleRemoveAvatar,
    form,
    getDynamicFieldsStatus,
  } = useDetails();
  // console.log('contactData', contactData);

  const detailsFormFields = detailsDataArray(
    orgId,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  );

  const firstName = contactData?.firstName ?? '';
  const lastName = contactData?.lastName ?? '';

  return (
    <>
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
                : `${firstName?.charAt(0)}${lastName?.charAt(0)}`}
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
            <MenuItem
              disabled={contactData?.profilePicture}
              component="label"
              htmlFor="upload-photo"
            >
              Upload Image
              <input
                type="file"
                id="upload-photo"
                style={{ display: 'none' }}
                accept="image/png, image/gif, image/jpeg, image/webp"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeUploadPhoto(e)
                }
              />
            </MenuItem>
            <MenuItem
              disabled={!contactData?.profilePicture}
              onClick={handleOpenRemoveImageDialog}
            >
              Remove Image
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={styles.horizontalTabsInnnerBox}>
          <Typography sx={{ mb: '16px' }} variant="h4">
            Basic Information
          </Typography>
          <FormProvider methods={methodsDetails}>
            <Grid container rowSpacing={'12px'} columnSpacing={'30px'}>
              {detailsFormFields?.map((item: any) => (
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
              {getDynamicFieldsStatus?.status === API_STATUS?.PENDING ? (
                <>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Skeleton
                      variant="rounded"
                      sx={{ width: '100%', height: '45px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Skeleton
                      variant="rounded"
                      sx={{ width: '100%', height: '45px' }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {form?.map((item: any) => (
                    <Grid item xs={12} sm={12} md={4} lg={4} key={item?.id}>
                      {componentMap[item?.component] &&
                        createElement(componentMap[item?.component], {
                          ...item?.componentProps,
                          name: item?.componentProps?.label,
                          size: 'small',
                        })}
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </FormProvider>

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                gap: 1.5,
              }}
            >
              <ButtonGroup>
                <Button
                  sx={{ height: '35px' }}
                  onClick={() => router?.push(AIR_SOCIAL?.CONTACTS)}
                >
                  Cancel
                </Button>
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
      </Box>
      <AlertModals
        message={`Are you sure you want to remove it?`}
        type="delete"
        open={isOpenRemoveImageDialog}
        handleClose={handleCloseRemoveImageDialog}
        handleSubmitBtn={handleRemoveAvatar}
        // loading={loading}
      />
      <Loader
        isLoading={
          loadingContactById || fetchingContactById || loadingUpdateDetail
        }
      />
    </>
  );
};

export default Details;
