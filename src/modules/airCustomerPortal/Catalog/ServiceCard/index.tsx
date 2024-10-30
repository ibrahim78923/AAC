import { generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import { ServiceCardPropsI } from './ServiceCard.interface';
import { TruncateText } from '@/components/TruncateText';
import { pxToRem } from '@/utils/getFontValue';

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
          <TruncateText
            text={service?.itemName}
            boxProps={{
              sx: { fontSize: pxToRem(18), fontWeight: 600 },
            }}
          />
          <TruncateText
            text={service?.description}
            size={100}
            boxProps={{
              sx: { fontSize: pxToRem(14) },
            }}
          />
          <Typography variant="body2" component={'div'}>
            {service?.cost ?? '---'}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
