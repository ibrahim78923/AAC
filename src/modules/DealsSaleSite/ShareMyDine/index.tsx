import React from 'react';
import DealDrawer from '../DealDrawer';
import {
  MailIcon,
  CallIcon,
  ActivitiesIcon,
  CalendarIcon,
  SaveIcon,
  ArrowBgDownIcon,
} from '@/assets/icons';

import { Box, Stack, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styles } from './ShareMyDine.style';
import {
  AccordianDetailsData,
  ShareAccordianData,
  ShareData,
} from './ShareMyDine.data';
import { v4 as uuidv4 } from 'uuid';

const ShareMyDine = () => {
  return (
    <>
      <DealDrawer
        defaultOpen
        hideBtn
        drawerProps={{
          title: 'Share my dine',
          okText: 'Submit',
          submitHandler: () => {},
        }}
      >
        <Box sx={styles.iconWrap}>
          <MailIcon />
          <CallIcon />
          <ActivitiesIcon />
          <CalendarIcon />
          <SaveIcon />
        </Box>
        <Box sx={{ marginTop: '40px' }}>
          {ShareData?.map((item: any) => (
            <Box
              key={uuidv4()}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: '15px',
              }}
            >
              <Typography>{item.heading}</Typography>
              <Typography>{item.values}</Typography>
            </Box>
          ))}
        </Box>

        <Box>
          {ShareAccordianData.map((item) => (
            <Accordion key={uuidv4()}>
              <AccordionSummary
                expandIcon={<ArrowBgDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <Typography
                    sx={{
                      background: '#35456D',
                      height: '24px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '24px',
                      borderRadius: '4px',
                      color: '#FFF',
                    }}
                  >
                    {item.number}
                  </Typography>
                  <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
                    {item.heading}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {AccordianDetailsData.map((data: any) => (
                  <Box key={uuidv4()} my={1}>
                    <Stack direction="row" gap={1}>
                      {/* <Image src={data.img} alt="" /> */}
                      <Stack
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack>
                          <Typography sx={styles.accordianText}>
                            {data.name}
                          </Typography>
                          <Typography sx={styles.accordianEmail}>
                            {data.email}
                          </Typography>
                        </Stack>
                        <Typography sx={styles.accordianText}>
                          {data.number}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </DealDrawer>
    </>
  );
};
export default ShareMyDine;
