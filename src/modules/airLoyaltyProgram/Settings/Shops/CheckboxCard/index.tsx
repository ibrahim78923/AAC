import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { generateImage, truncateText } from '@/utils/avatarUtils';
import { LOYALTY_SHOP_TYPE_MAPPED } from '@/constants/api-mapped';

const CheckboxCard = (props: any) => {
  const { data, handleSelect, selectedShopsList, setIsPortalOpen } = props;

  const theme = useTheme();

  return (
    <>
      <Box
        onClick={() => setIsPortalOpen({ isOpen: true, data, isDetail: true })}
        display={'flex'}
        p={2}
        borderRadius={2}
        justifyContent={'space-between'}
        border="1px solid"
        mb={1}
        height="100%"
        sx={{
          cursor: 'pointer',
          borderColor: 'custom.pale_gray',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
            backgroundColor: 'custom.light_green_background',
          },
        }}
      >
        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
          <Avatar
            sx={{
              bgcolor: 'custom.dark',
              width: 48,
              height: 48,
            }}
            variant="rounded"
            src={generateImage(data?.attachmentsDetails?.fileUrl)}
          />
          <Box>
            <Typography variant="h5" fontWeight={600} color={'slateBlue.main'}>
              {truncateText(data?.name)}
            </Typography>
            <Typography variant="body2" color="slateBlue.main" fontWeight={500}>
              {LOYALTY_SHOP_TYPE_MAPPED?.[data?.shopType]}
            </Typography>
            <Typography variant="body3" color="grey.900">
              Date: {dayjs(data?.createdAt).format(DATE_FORMAT?.UI)}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Checkbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxCheckedIcon />}
            checked={
              !!selectedShopsList?.find((item: any) => item?._id === data?._id)
            }
            onClick={(e: any) => {
              e?.stopPropagation();
            }}
            onChange={(e: any) => handleSelect?.(e, data)}
            color="primary"
            name="id"
          />
        </Box>
      </Box>
    </>
  );
};

export default CheckboxCard;
