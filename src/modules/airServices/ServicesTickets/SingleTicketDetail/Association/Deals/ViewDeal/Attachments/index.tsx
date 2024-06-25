import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateImage } from '@/utils/avatarUtils';

export default function Attachments({ theme, dealAttachments }: any) {
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
            {dealAttachments?.length < 10
              ? `0${dealAttachments?.length}`
              : dealAttachments?.length}
          </Typography>
          Attachments
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!dealAttachments?.length ? (
          <Typography variant={'body2'} fontWeight={500}>
            No Attachments Associated With This Record
          </Typography>
        ) : (
          <Box display={'flex'} alignItems={'center'} gap={2}>
            {dealAttachments?.map((item: any) => (
              <Avatar
                key={item?._id}
                sx={{
                  bgcolor: theme?.palette?.blue?.main,
                  width: 45,
                  height: 45,
                }}
                variant={'rounded'}
                src={generateImage(item?.fileUrl)}
              />
            ))}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
