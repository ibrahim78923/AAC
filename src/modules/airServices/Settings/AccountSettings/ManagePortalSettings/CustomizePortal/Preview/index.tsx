import {
  AirCustomerPortalDashboard,
  AirCustomerPortalLogo,
  AirCustomerPortalProfile,
} from '@/assets/images';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import usePreview from './usePreview';
import { NavbarDataArray } from './Preview.data';
import {
  IPreviewProps,
  INavbarDataArrayItem,
} from '../CustomizePortal.interface';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Preview = (props: IPreviewProps) => {
  const {
    companyLogo,
    primaryButton,
    secondaryButton,
    sideMenu,
    sideMenuIconPrimary,
    sideMenuIconSecondary,
    isFileInstance,
    isStringUrl,
    reducedOpacityBgColor,
  } = usePreview(props);

  return (
    <Box
      border={1}
      borderColor={'grey.700'}
      borderRadius={4}
      overflow={'auto'}
      minWidth={'650px'}
      width={'100%'}
    >
      <Grid container>
        <Grid item xs={3}>
          <Box
            borderRight={1}
            borderColor={'grey.400'}
            bgcolor={sideMenu}
            pb={2}
            height={'100%'}
          >
            <Box p={2} mb={4}>
              {isFileInstance(companyLogo) ? (
                <Image
                  src={URL?.createObjectURL(companyLogo)}
                  alt={'Air Apple Cart'}
                  width={153}
                  height={38}
                  style={{ objectFit: 'contain' }}
                />
              ) : isStringUrl(companyLogo) ? (
                <Image
                  src={companyLogo}
                  alt={'Air Apple Cart'}
                  width={153}
                  height={38}
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <Image
                  src={AirCustomerPortalLogo}
                  alt={'Air Apple Cart'}
                  width={153}
                  height={38}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </Box>

            {NavbarDataArray?.map((item: INavbarDataArrayItem) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={1}
                p={1}
                m={1}
                borderRadius={1}
                bgcolor={item?.id === 1 ? reducedOpacityBgColor : 'transparent'}
                key={item?.id}
              >
                <Box
                  display={'flex'}
                  bgcolor={sideMenuIconSecondary}
                  p={0.2}
                  borderRadius={0.5}
                >
                  <item.icon fill={sideMenuIconPrimary} />
                </Box>
                <Typography
                  variant={'body2'}
                  fontWeight={500}
                  color={sideMenuIconPrimary}
                >
                  {item?.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box p={2}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <IconButton
                sx={{
                  '&.Mui-disabled': {
                    bgcolor: 'custom.light_greyish',
                  },
                }}
                disabled
              >
                <SearchIcon sx={{ color: 'custom.main' }} />
              </IconButton>

              <Image
                src={AirCustomerPortalProfile}
                alt={'Profile'}
                width={100}
                height={36}
              />
            </Box>

            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              gap={2}
              alignItems={'center'}
              my={2}
            >
              <Button
                variant={'outlined'}
                sx={{
                  '&.Mui-disabled': {
                    borderColor: secondaryButton,
                    color: secondaryButton,
                  },
                }}
                startIcon={
                  <ArrowBackIcon
                    color={secondaryButton}
                    sx={{ cursor: 'pointer' }}
                  />
                }
                disabled
              >
                Revert
              </Button>
              <Button
                variant={'contained'}
                sx={{
                  '&.Mui-disabled': {
                    bgcolor: primaryButton,
                    color: 'common.white',
                  },
                }}
                startIcon={
                  <AddBoxIcon
                    color={primaryButton}
                    sx={{ cursor: 'pointer' }}
                  />
                }
                endIcon={
                  <ArrowDropDownIcon
                    color={primaryButton}
                    sx={{ cursor: 'pointer' }}
                  />
                }
                disabled
              >
                New
              </Button>
            </Box>

            <Image
              src={AirCustomerPortalDashboard}
              alt={'Profile'}
              priority
              width={1178}
              height={751}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Preview;
