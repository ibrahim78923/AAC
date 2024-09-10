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
import { generateImage } from '@/utils/avatarUtils';

const Preview = (props: IPreviewProps) => {
  const {
    image,
    btnPrimary,
    btnSecondary,
    sideMenu,
    iconPrimary,
    iconSecondary,
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
            <Box p={2} mb={2}>
              {isFileInstance(image) ? (
                <Image
                  src={URL?.createObjectURL(image)}
                  alt={'Air Apple Cart'}
                  width={153}
                  height={38}
                  style={{ objectFit: 'contain' }}
                />
              ) : isStringUrl(image?.url) ? (
                <Image
                  src={generateImage(image?.url)}
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
                  bgcolor={iconSecondary}
                  p={0.2}
                  borderRadius={0.5}
                >
                  <item.icon fill={iconPrimary} />
                </Box>
                <Typography
                  variant={'body2'}
                  fontWeight={500}
                  color={iconPrimary}
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
                    borderColor: btnSecondary,
                    color: btnSecondary,
                  },
                }}
                startIcon={
                  <ArrowBackIcon
                    color={btnSecondary}
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
                    bgcolor: btnPrimary,
                    color: 'common.white',
                  },
                }}
                startIcon={
                  <AddBoxIcon color={btnPrimary} sx={{ cursor: 'pointer' }} />
                }
                endIcon={
                  <ArrowDropDownIcon
                    color={btnPrimary}
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
