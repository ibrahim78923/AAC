import { generateImage, truncateText } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import { ServiceCardPropsI } from './ServiceCard.interface';

export const ServiceCard = (props: ServiceCardPropsI) => {
  const { service, onCardClick } = props;
  return (
    <>
      <Box
        onClick={() => onCardClick?.()}
        borderRadius={2}
        border={'0.3rem solid'}
        borderColor={'primary.lighter'}
        display={'flex'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        gap={2}
        p={1}
        height="100%"
      >
        <Avatar
          sx={{ height: '4rem', width: '4rem' }}
          src={generateImage(service?.attachmentDetails?.fileUrl)}
        />
        <Box>
          <Typography variant="h5">
            {truncateText(service?.itemName ?? '---')}
          </Typography>
          <Typography variant="body2" component={'span'}>
            {truncateText(service?.description ?? '---', 37)}
          </Typography>
          <Typography variant="body2" component={'div'}>
            {service?.cost ?? '---'}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
