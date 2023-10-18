import React from 'react';

import Image from 'next/image';

import {
  Box,
  Stack,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import DealDrawer from '../DealDrawer';

import {
  AccordianDetailsData,
  ShareAccordianData,
  ShareData,
} from '../../../../mock/modules/airSales/Deals/ShareMyDine';

import {
  MailIcon,
  CallIcon,
  ActivitiesIcon,
  CalendarIcon,
  SaveIcon,
  ArrowBgDownIcon,
} from '@/assets/icons';

import { styles } from './ShareMyDine.style';

import { v4 as uuidv4 } from 'uuid';

const ShareMyDine = () => {
  const theme = useTheme();

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
            <Box key={uuidv4()} sx={styles.heading}>
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
                  <Typography sx={styles.accordianSummary(theme)}>
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
                      <Image src={data.img} alt="" />
                      <Stack
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack>
                          <Typography sx={styles.accordianText(theme)}>
                            {data.name}
                          </Typography>
                          <Typography sx={styles.accordianEmail(theme)}>
                            {data.email}
                          </Typography>
                        </Stack>
                        <Typography sx={styles.accordianText(theme)}>
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
