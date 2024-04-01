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
  // AccordianDetailsData,
  // ShareAccordianData,
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

  // const newData = [DealsActionData?.data]?.map((obj) => {
  //   return [
  //     {
  //       id: '1',
  //       name: 'company name',
  //       data: obj?.companies,
  //     },
  //     {
  //       id: '2',
  //       name: 'contact Name',
  //       data: obj?.contacts,
  //     },
  //     {
  //       id: '3',
  //       name: 'product name',
  //       data: obj?.products,
  //     },
  //   ];
  // });
  // console.log(newData, 'newData');

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
          <Accordion key={uuidv4()}>
            <AccordionSummary
              expandIcon={<ArrowBgDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: '0px' }}
            >
              <Typography sx={styles?.accordianSummary(theme)}>
                {DealsActionData?.data?.contacts?.length}
              </Typography>
              <Typography
                sx={{
                  color: theme?.palette?.slateBlue['main'],
                  fontSize: '16px',
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                {'Contacts'}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {DealsActionData?.data?.contacts?.map((data: any) => (
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
                        {data?.phoneNumber ?? 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion key={uuidv4()}>
            <AccordionSummary
              expandIcon={<ArrowBgDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: '0px' }}
            >
              <Typography sx={styles?.accordianSummary(theme)}>
                {DealsActionData?.data?.products?.length}
              </Typography>

              <Typography
                sx={{
                  color: theme?.palette?.slateBlue['main'],
                  fontSize: '16px',
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                {'Companies'}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {DealsActionData?.data?.companies?.map((data: any) => (
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
                          {data?.owner?.firstName ?? 'N/A'}
                          {data?.owner?.lastName ?? 'N/A'}
                        </Typography>
                        <Typography sx={styles?.accordianEmail(theme)}>
                          {data?.owner?.email ?? 'N/A'}
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          color: theme?.palette?.grey['900'],
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {data?.owner?.phoneNumber ?? 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion key={uuidv4()}>
            <AccordionSummary
              expandIcon={<ArrowBgDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: '0px' }}
            >
              <Typography sx={styles?.accordianSummary(theme)}>
                {DealsActionData?.data?.products?.length}
              </Typography>
              <Typography
                sx={{
                  color: theme?.palette?.slateBlue['main'],
                  fontSize: '16px',
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                {'Products'}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {DealsActionData?.data?.products?.map((data: any) => (
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
                          {data?.name}
                        </Typography>
                        {/* <Typography sx={styles?.accordianEmail(theme)}>
                            {data?.email ?? 'N/A'}
                          </Typography> */}
                      </Stack>
                      <Typography
                        sx={{
                          color: theme?.palette?.grey['900'],
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        £ ${data?.unitPrice ?? 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </AccordionDetails>

            <AccordionDetails>
              {DealsActionData?.data?.quotes?.map((data: any) => (
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
                          {data?.name}
                        </Typography>
                        {/* <Typography sx={styles?.accordianEmail(theme)}>
                            {data?.email ?? 'N/A'}
                          </Typography> */}
                      </Stack>
                      <Typography
                        sx={{
                          color: theme?.palette?.grey['900'],
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        £ {data?.unitPrice ?? 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </CommonDrawer>
    </>
  );
};
export default ShareMyDine;
