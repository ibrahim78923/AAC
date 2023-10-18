import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';

import EmailActionDropDown from './EmailActionDropDown';
import EmailEditorDrawer from './EmailEditorDrawer';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { isNullOrEmpty } from '@/utils';

import { NotesDataArray } from '@/mock/modules/Deals';

import {
  GmailIcon,
  MessageIcon,
  OutlookIcon,
  SMSIcon,
  SendArrowIcon,
} from '@/assets/icons';
import { styles } from '../ViewDetails.style';

const Emails = () => {
  const { NameWithStyledWords, theme } = useNameWithStyledWords();
  const [openDrawer, setOpenDrawer] = useState('');
  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4"> Emails</Typography>
            {!isNullOrEmpty(NotesDataArray) && (
              <Box sx={{ gap: 1, display: 'flex' }}>
                <EmailActionDropDown setOpenDrawer={setOpenDrawer} />
                <Button
                  variant="contained"
                  className="small"
                  sx={{ gap: 0.5 }}
                  onClick={() => setOpenDrawer('New')}
                >
                  <Typography variant="body2">Send Emails</Typography>
                  <SendArrowIcon />
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      {!isNullOrEmpty(NotesDataArray) && (
        <Box
          sx={{
            height: '35vh',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <MessageIcon />
          <Typography variant="body2" sx={{ color: theme.palette.grey[900] }}>
            Send Email right now from the CRM
          </Typography>
          <Button variant="contained" sx={{ height: '35px', gap: 0.5 }}>
            <Typography variant="body2">Send Emails</Typography>
            <SendArrowIcon />
          </Button>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.slateBlue.main }}
          >
            Bring Your emails into the CRM
          </Typography>
          <Box
            sx={{
              gap: 1,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              variant="outlined"
              sx={{ color: 'grey', gap: 0.5 }}
              className="small"
            >
              <GmailIcon /> <Typography variant="body2">Gmail</Typography>
            </Button>

            <Button
              variant="outlined"
              sx={{ color: 'grey', gap: 0.5 }}
              className="small"
            >
              <OutlookIcon />
              <Typography variant="body2">Microsoft Outlook</Typography>
            </Button>

            <Button
              variant="outlined"
              sx={{ color: 'grey', gap: 0.5 }}
              className="small"
            >
              <SMSIcon /> <Typography variant="body2">Others</Typography>
            </Button>
          </Box>
        </Box>
      )}

      {isNullOrEmpty(NotesDataArray) && (
        <Grid item xs={12} sx={styles.horizontalTabsInnnerBox}>
          {NotesDataArray.map((item) => (
            <Grid
              container
              key={item.title}
              sx={{
                py: 3,
                px: 1.5,
                boxShadow: 'box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                borderRadius: '8px',
                border: '1px solid #f2f2f2',
              }}
            >
              <Grid
                item
                xs={2}
                lg={0.5}
                sm={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Checkbox color="primary" name={'name'} />
              </Grid>
              <Grid
                item
                xs={6}
                sm={2}
                lg={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image src={item.image} alt="Avatar" />
              </Grid>
              <Grid item xs={12} lg={10} sm={9} sx={{ gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <NameWithStyledWords
                      name={item.title}
                      customKey="ActivityHead"
                    />
                    &nbsp; : &nbsp;
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body3"
                  sx={{ color: theme.palette.custom.main }}
                >
                  {item.date}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      <EmailEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default Emails;
