import CommonDrawer from '@/components/CommonDrawer';
import { Box, Button, Typography } from '@mui/material';
const ShopDetailsModal = ({
  data,
  isDetailDrawerOpen,
  setIsDetailDrawerOpen,
  setAddShopModalOpen,
  setDeleteModalOpen,
}: any) => {
  const formattedData = {
    'Shop Name': data?.shopName,
    'Shope Type': data?.shopeType,
    'Associated Email': data?.associatedEmail,
    city: data?.city,
    country: data?.country,
    'Post Code': data?.postCode,
    address: data?.address,
  };

  return (
    <CommonDrawer
      isDrawerOpen={isDetailDrawerOpen}
      onClose={() => setIsDetailDrawerOpen(false)}
      okText={'Edit'}
      title={'Shop Details'}
      isOk={true}
      cancelText={'Delete'}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 2.4,
          pt: 1,
        }}
      >
        {Object.entries(formattedData)?.map(([key, value]) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5" fontWeight={500} color="blue.dull_blue">
              {key}
            </Typography>
            <Typography variant="body3" color="custom.main">
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          position: 'absolute',
          right: 24,
          bottom: 8,
          zIndex: 50,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setDeleteModalOpen(true);
            setIsDetailDrawerOpen(false);
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsDetailDrawerOpen(false);
            setAddShopModalOpen(true);
          }}
        >
          Edit
        </Button>
      </Box>
    </CommonDrawer>
  );
};

export default ShopDetailsModal;
