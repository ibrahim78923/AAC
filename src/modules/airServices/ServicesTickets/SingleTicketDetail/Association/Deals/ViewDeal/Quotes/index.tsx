import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { ARTICLE_STATUS } from '@/constants/strings';

export default function Quotes({ theme, dealQuotes }: any) {
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
            {dealQuotes?.length < 10
              ? `0${dealQuotes?.length}`
              : dealQuotes?.length}
          </Typography>
          Quotes
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!dealQuotes?.length ? (
          <Typography variant={'body2'} fontWeight={500}>
            No Quotes Associated With This Record
          </Typography>
        ) : (
          dealQuotes?.map((item: any) => (
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
                <Typography variant={'body2'} fontWeight={700}>
                  {item?.name}
                </Typography>
                <Typography variant={'body2'} fontWeight={400}>
                  {dayjs(item?.expiryDate)?.format(DATE_FORMAT?.UI)}
                </Typography>
              </Box>
              <Chip
                label={item?.status}
                sx={{
                  bgcolor:
                    item?.status === ARTICLE_STATUS?.PUBLISHED
                      ? 'success.light'
                      : 'warning.lighter',
                  fontWeight: 600,
                }}
              />
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
}
