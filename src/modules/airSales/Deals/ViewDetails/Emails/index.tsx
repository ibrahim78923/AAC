import Image from 'next/image';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';
import { isNullOrEmpty } from '@/utils';

import useEmails from './useEmails';
import EmailActionDropDown from './EmailActionDropDown';
import EmailEditorDrawer from './EmailEditorDrawer';

import { NotesDataArray } from '@/mock/modules/airSales/Deals/ViewDetails';

import { styles } from '../ViewDetails.style';

import {
  GmailIcon,
  MessageIcon,
  OutlookIcon,
  SMSIcon,
  SendArrowIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';

const Emails = () => {
  const { NameWithStyledWords, theme } = useNameWithStyledWords();

  const {
    openDrawer,
    setOpenDrawer,
    handleCheckboxChange,
    selectedCheckboxes,
  } = useEmails();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4"> Emails</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={styles?.headingSpacingBetween}>
            {!isNullOrEmpty(NotesDataArray) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <EmailActionDropDown
                  setOpenDrawer={setOpenDrawer}
                  selectedCheckboxes={selectedCheckboxes}
                />
                <PermissionsGuard
                  permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_SEND_EMAIL]}
                >
                  <Button
                    variant="contained"
                    className="small"
                    sx={{ gap: 0.5 }}
                    onClick={() => setOpenDrawer('New')}
                  >
                    <Typography variant="body2">Send Emails</Typography>
                    <SendArrowIcon />
                  </Button>
                </PermissionsGuard>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      {isNullOrEmpty(NotesDataArray) && (
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
          <Typography variant="body2" sx={{ color: theme?.palette?.grey[900] }}>
            Send Email right now from the CRM
          </Typography>
          <Button variant="contained" sx={{ height: '35px', gap: 0.5 }}>
            <Typography variant="body2">Send Emails</Typography>
            <SendArrowIcon />
          </Button>
          <Typography
            variant="body2"
            sx={{ color: theme?.palette?.slateBlue?.main }}
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

      {!isNullOrEmpty(NotesDataArray) && (
        <Grid item xs={12} sx={styles?.horizontalTabsInnnerBox}>
          {NotesDataArray?.map((item) => (
            <Grid
              container
              key={uuidv4()}
              sx={{
                py: 3,
                px: 1.5,
                mb: 1,
                boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
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
                <Checkbox
                  color="primary"
                  name={'name'}
                  onChange={(event) => handleCheckboxChange(event, item?.id)}
                  checked={selectedCheckboxes?.some(
                    (selectedItem) => selectedItem?.id === item?.id,
                  )}
                />
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
                <Image src={item?.image} alt="Avatar" />
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
                      name={item?.title}
                      customKey="ActivityHead"
                    />
                    &nbsp; : &nbsp;
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme?.palette?.primary?.main,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item?.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.custom?.main }}
                >
                  {item?.date}
                </Typography>
                <Typography variant="body2">{item?.description}</Typography>
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
