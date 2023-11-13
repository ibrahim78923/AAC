import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './Chat.styles';
import { emailsData } from './Chat.data';
import { CallIcon, SmsIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

const ContactModal = ({ open, onClose }: any) => {
  const theme = useTheme();
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer={false}
      title="Related Contacts"
      okText=""
      cancelText=""
    >
      <Box>
        <Box display="flex" justifyContent={'space-between'}>
          <Box>
            <Typography variant="h5">Laura Norda (Sample)</Typography>
            <Typography variant="body3" sx={styles?.sendEmail(theme)}>
              To: John Doe
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <SmsIcon />
            <CallIcon />
          </Box>
        </Box>
      </Box>
      <Box pt={1.5}>
        <Typography variant="h5" sx={{ color: theme?.palette?.slateBlue.main }}>
          Details
        </Typography>
        <Box sx={styles?.emailDetails}>
          <Box sx={styles?.headingWrap}>
            <Typography variant="body3" sx={styles?.emailHeading(theme)}>
              Email
            </Typography>
            <Typography variant="body3" sx={styles?.emailHeading(theme)}>
              Phone
            </Typography>
          </Box>
          <Box sx={{ ...styles?.headingWrap, alignItems: 'end' }}>
            <Typography variant="body3" sx={styles?.emailInfo(theme)}>
              johndoe@dummy.com
            </Typography>
            <Typography variant="body3" sx={styles?.emailInfo(theme)}>
              +44 123 656 9252
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box paddingY={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 2,
          }}
        >
          <Typography
            variant="formTopHeading"
            sx={{ color: theme?.palette?.slateBlue?.main }}
          >
            Email
          </Typography>
          <Typography
            variant="body3"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            Show More
          </Typography>
        </Box>
        {emailsData?.map((item: any) => (
          <Box key={uuidv4()} sx={styles?.emailsWrap(theme)}>
            <Typography variant="body3" sx={styles?.emails(theme)}>
              {item?.heading}
            </Typography>
            <Typography variant="body3" sx={styles?.emailDesc(theme)}>
              {item?.desc}
            </Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.primary?.main }}
            >
              {item?.date}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ color: theme.palette?.slateBlue?.main }}>
          Deal
        </Typography>
        <Box sx={styles?.dealsWrap(theme)}>
          <Typography
            variant="body4"
            sx={{ color: theme?.palette?.custom?.light }}
          >
            Nothing to show
          </Typography>
        </Box>
      </Box>
    </CommonDrawer>
  );
};

export default ContactModal;
