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

export default function Products({ theme, dealProducts }: any) {
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
            {dealProducts?.length < 10
              ? `0${dealProducts?.length}`
              : dealProducts?.length}
          </Typography>
          Products
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!dealProducts?.length ? (
          <Typography variant={'body2'} fontWeight={500}>
            No Products Associated With This Record
          </Typography>
        ) : (
          dealProducts?.map((item: any) => (
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
                  src={generateImage(item?.image?.url)}
                >
                  <Typography variant={'body2'} textTransform={'uppercase'}>
                    {fullNameInitial(item?.name)}
                  </Typography>
                </Avatar>
                <Typography variant={'body2'} fontWeight={500}>
                  {item?.name ?? '---'} x{item?.quantity ?? ''}
                </Typography>
              </Box>
              <Typography variant={'body2'}>
                £{item?.unitPrice ?? '---'}
              </Typography>
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
}
