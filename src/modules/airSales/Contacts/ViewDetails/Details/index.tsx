import React from 'react';
import Image from 'next/image';

import {
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import useDetails from './useDetails';

import { detailsDataArray, systemInformationDataArray } from './Details.data';

import { styles } from '../ViewDetails.style';

import { ElipseImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import { EditProfile } from '@/assets/icons';

const Details = () => {
  const {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    anchorEl,
    open,
    handleShowMenuClick,
    handleClose,
  } = useDetails();

  return (
    <Box sx={styles.horizontalTabsBox}>
      <Typography variant="h4">Details</Typography>
      <Box>
        <Box
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Image src={ElipseImage} alt="icon" width={100} height={100} />
          <Box
            sx={{ position: 'absolute', bottom: '-10px', right: '0' }}
            onClick={handleShowMenuClick}
          >
            <EditProfile />
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
        <FormProvider
          methods={methodsDetails}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {detailsDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography>{item.label}</Typography>
                <item.component {...item.componentProps} size={'small'}>
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
            {/* <Grid item xs={12}>
              <Divider sx={{ borderColor: theme.palette.grey[700] }} />
            </Grid> */}
          </Grid>
          <Typography sx={{ mt: '24px', mb: '24px' }} variant="h4">
            System Information
          </Typography>
          <Grid container spacing={4}>
            {systemInformationDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography>{item.label}</Typography>
                <item.component {...item.componentProps} size={'small'}>
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
              <Divider sx={{ borderColor: theme.palette.grey[700] }} />
            </Grid>
          </Grid>

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
                <Button sx={{ height: '35px' }}>Update</Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Details;
