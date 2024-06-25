import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fullNameInitial, generateImage } from '@/utils/avatarUtils';

export default function Contacts({ theme, dealContacts }: any) {
  return (
    <Accordion
      sx={{
        mt: 3,
        borderRadius: '8px !important',
        boxShadow: `0px 0px 4px 0px ${theme?.palette?.custom?.steel_blue}`,
        '&.Mui-expanded': {
          boxShadow: `0px 0px 4px 0px ${theme?.palette?.custom?.steel_blue}`,
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant={'h5'}>
          <Typography
            variant={'body1'}
            component={'span'}
            bgcolor={'secondary.main'}
            borderRadius={1}
            p={0.4}
            color={'common.white'}
            mr={0.5}
          >
            {dealContacts?.length < 10
              ? `0${dealContacts?.length}`
              : dealContacts?.length}
          </Typography>
          Contacts
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!dealContacts?.length ? (
          <Typography variant={'body2'} fontWeight={500}>
            No Contacts Associated With This Record
          </Typography>
        ) : (
          dealContacts?.map((item: any) => (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={1}
              key={item?._id}
              overflow={'auto'}
              mb={2}
            >
              <Box display={'flex'} alignItems={'center'} gap={1}>
                <Avatar
                  sx={{
                    bgcolor: theme?.palette?.blue?.main,
                    width: 40,
                    height: 40,
                  }}
                  src={generateImage(item?.profilePicture)}
                >
                  <Typography variant={'body2'} textTransform={'uppercase'}>
                    {fullNameInitial(item?.name)}
                  </Typography>
                </Avatar>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant={'body2'} fontWeight={500}>
                    {item?.name}
                  </Typography>
                  <Typography variant={'subtitle2'} fontWeight={400}>
                    {item?.email}
                  </Typography>
                </Box>
              </Box>
              <Typography variant={'body2'}>{item?.phoneNumber}</Typography>
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
}
