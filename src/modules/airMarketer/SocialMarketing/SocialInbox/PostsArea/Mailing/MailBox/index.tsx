import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from '../Mailing.style';
import Image from 'next/image';
import { ArrowDownIcon } from '@/assets/icons';

const MailBox = ({ data, type }: any) => {
  const theme = useTheme();
  return (
    <Box sx={styles?.mainMailingWrapper}>
      <Box sx={styles?.contentContainer}>
        <Grid container spacing={2}>
          <Grid item xs={0.8}>
            <Box>
              <Image src={data?.userImage} width={50} height={50} alt="user" />
            </Box>
          </Grid>
          <Grid item xs={11.2}>
            <Box>
              <Typography variant="h5">{data?.userName}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {type === 'main' && (
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.grey[600], fontWeight: '600' }}
                  >
                    From : {data?.from}{' '}
                  </Typography>
                )}
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.grey[600], fontWeight: '600' }}
                >
                  To : {data?.to[0]}{' '}
                </Typography>
              </Box>
              <Box sx={styles?.mailMenu}>
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.grey[900] }}
                >
                  {data?.timeStamp}
                </Typography>
                <Box sx={styles?.menuItems}>
                  <ArrowDownIcon size={'20'} />
                </Box>
              </Box>
              <Box mt={1}>
                <Typography variant="h6" fontWeight={400}>
                  <strong>Email Subject : </strong>
                  {data?.subject}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: data?.body }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MailBox;
