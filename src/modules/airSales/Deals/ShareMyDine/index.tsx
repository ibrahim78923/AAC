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

import CommonDrawer from '@/components/CommonDrawer';
import { useGetDealsActionPreviewQuery } from '@/services/airSales/deals';

import {
  AccordianDetailsData,
  ShareAccordianData,
  ShareData,
} from './ShareMyDine.data';

import { v4 as uuidv4 } from 'uuid';
import {
  ActivitiesIcon,
  ArrowBgDownIcon,
  CalendarIcon,
  CallIcon,
  MailIcon,
  SaveIcon,
} from '@/assets/icons';

import { styles } from './ShareMyDine.style';

const ShareMyDine = ({ open, onClose, selectedTableIds }: any) => {
  const theme = useTheme();
  const { data: DealsActionData }: any = useGetDealsActionPreviewQuery({
    id: selectedTableIds[0],
  });

  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={onClose}
        footer
        isCancel={false}
        isOk={false}
        okText=""
        title={DealsActionData?.data?.name}
      >
        <Box sx={styles?.iconWrap}>
          <MailIcon />
          <CallIcon />
          <ActivitiesIcon />
          <CalendarIcon />
          <SaveIcon />
        </Box>
        <Box sx={{ marginTop: '40px' }}>
          {ShareData(DealsActionData?.data)?.map((item: any) => (
            <Box key={uuidv4()} sx={styles?.heading}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: theme?.palette?.custom['main'],
                }}
              >
                {item?.heading}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14x',
                  fontWeight: 600,
                  color: theme?.palette?.slateBlue['main'],
                }}
              >
                {item?.values}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box>
          {ShareAccordianData?.map((item) => (
            <Accordion key={uuidv4()}>
              <AccordionSummary
                expandIcon={<ArrowBgDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: '0px' }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <Typography sx={styles?.accordianSummary(theme)}>
                    {item?.number}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme?.palette?.slateBlue['main'],
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {item.heading}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {AccordianDetailsData?.map((data: any) => (
                  <Box key={uuidv4()} my={1}>
                    <Stack direction="row" gap={1}>
                      <Image src={data?.img} alt="" />
                      <Stack
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack>
                          <Typography sx={styles?.accordianText(theme)}>
                            {data?.name ?? 'N/A'}
                          </Typography>
                          <Typography sx={styles?.accordianEmail(theme)}>
                            {data?.email ?? 'N/A'}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            color: theme?.palette?.grey['900'],
                            fontSize: '14px',
                            fontWeight: 500,
                          }}
                        >
                          {data?.number ?? 'N/A'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </CommonDrawer>
    </>
  );
};
export default ShareMyDine;
