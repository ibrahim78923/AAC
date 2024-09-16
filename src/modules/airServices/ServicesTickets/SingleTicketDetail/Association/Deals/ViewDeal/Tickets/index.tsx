import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Tickets({ theme, dealTickets }: any) {
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
            {dealTickets?.length < 10
              ? `0${dealTickets?.length}`
              : dealTickets?.length}
          </Typography>
          Tickets
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!dealTickets?.length ? (
          <Typography variant={'body2'} fontWeight={500}>
            No Tickets Associated With This Record
          </Typography>
        ) : (
          dealTickets?.map((item: any) => (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={1}
              key={item?._id}
              overflow={'auto'}
              mb={2}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant={'body2'} fontWeight={500}>
                  {item?.ticketIdNumber ?? '---'}
                </Typography>
                <Typography variant={'subtitle2'} fontWeight={400}>
                  {item?.subject ?? '---'}
                </Typography>
              </Box>
              <Typography variant={'body2'}>{item?.status ?? '---'}</Typography>
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
}
