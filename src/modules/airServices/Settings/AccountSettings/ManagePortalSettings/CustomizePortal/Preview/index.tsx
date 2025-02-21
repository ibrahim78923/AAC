import {
  AirCustomerPortalDashboard,
  AirCustomerPortalProfile,
} from '@/assets/images';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
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
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';
import { PROJECT_NAME } from '@/config';

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
      <ContainerGrid spacing={0}>
        <CustomGrid xs={3}>
          <Box
            borderRight={1}
            borderColor={'grey.400'}
            bgcolor={sideMenu}
            pb={2}
            height={'100%'}
          >
            <Box p={2} mb={2}>
              {isFileInstance(image) ? (
                <Avatar
                  src={URL?.createObjectURL(image)}
                  alt={PROJECT_NAME}
                  sx={{
                    width: '100%',
                    height: 38,
                  }}
                  variant="square"
                />
              ) : isStringUrl(image?.url) ? (
                <CustomAvatar
                  avatarSrc={image?.url}
                  avatarSize={{
                    width: '100%',
                    height: 38,
                    variant: 'square',
                  }}
                  backgroundColor="transparent"
                />
              ) : (
                <LogoAvatar productName="Customer Portal" />
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
        </CustomGrid>
        <CustomGrid xs={9}>
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
                className="small"
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
                className="small"
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
        </CustomGrid>
      </ContainerGrid>
    </Box>
  );
};

export default Preview;
