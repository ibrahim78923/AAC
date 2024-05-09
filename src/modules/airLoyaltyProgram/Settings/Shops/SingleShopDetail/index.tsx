import CommonDrawer from '@/components/CommonDrawer';
import { AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { getActivePermissionsSession } from '@/utils';
import { Box, Typography } from '@mui/material';

const SingleShopDetail = (props: any) => {
  const { isPortalOpen, setIsPortalOpen, setSelectedShopsList } = props;
  const overallPermissions = getActivePermissionsSession();

  const formattedData = {
    'Shop Name': isPortalOpen?.data?.name,
    'Shope Type': isPortalOpen?.data?.shopType ?? '---',
    'Associated Email': isPortalOpen?.data?.email ?? '---',
    City: isPortalOpen?.data?.city ?? '---',
    Country: isPortalOpen?.data?.country ?? '---',
    'Post Code': isPortalOpen?.data?.postCode ?? '---',
    Address: isPortalOpen?.data?.address ?? '---',
  };

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      onClose={() => setIsPortalOpen({})}
      okText={'Edit'}
      title={'Shop Details'}
      isOk={overallPermissions?.includes(
        AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.EDIT_SHOP,
      )}
      isCancel={overallPermissions?.includes(
        AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.DELETE_SHOP,
      )}
      footer
      cancelText={'Delete'}
      cancelBtnHandler={() => {
        setIsPortalOpen({
          isOpen: true,
          isDelete: true,
          data: isPortalOpen?.data,
        });
        setSelectedShopsList?.([isPortalOpen?.data]);
      }}
      submitHandler={() =>
        setIsPortalOpen({
          isOpen: true,
          isUpsert: true,
          data: isPortalOpen?.data,
        })
      }
    >
      <Box>
        {Object?.entries(formattedData ?? {})?.map(([key, value]: any) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 3,
              mb: 3,
            }}
          >
            <Typography variant="h5" fontWeight={500} color="blue.dull_blue">
              {key}
            </Typography>
            <Typography variant="body2" color="custom.main">
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </CommonDrawer>
  );
};

export default SingleShopDetail;
