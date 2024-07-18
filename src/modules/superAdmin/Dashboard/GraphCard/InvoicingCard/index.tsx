import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Grid } from '@mui/material';
import useInvoicingCard from './useInvoicingCard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { v4 as uuidv4 } from 'uuid';
import { InvoicingCardPropsI } from '@/modules/superAdmin/Dashboard/Dashboard-interface';
import { TICKETS_STATE } from '@/constants/strings';

const InvoicingCard = ({ details, isLoading }: InvoicingCardPropsI) => {
  const { options, theme, invoiceHeadings, invoiceAmount } =
    useInvoicingCard(details);
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Box
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <Grid container>
            <Grid item xl={6} xs={12}>
              <Typography
                variant="body2"
                sx={{
                  color: `${theme?.palette?.grey[800]}`,
                  fontWeight: 600,
                  paddingBottom: '1rem',
                }}
              >
                Invoicing
              </Typography>
              <Grid container spacing={2}>
                {details?.invoicing?.inDividual?.map(
                  (item: any, index: number) => {
                    if (index === 2) return null;
                    return (
                      <Grid item lg={6} key={uuidv4()}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: `${theme?.palette?.custom?.main}`,
                            }}
                          >
                            {invoiceHeadings(item?._id)}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                item?._id === TICKETS_STATE.PAID
                                  ? theme?.palette?.success?.main
                                  : item?._id === TICKETS_STATE?.PENDING
                                  ? theme?.palette?.custom?.bright
                                  : item?._id === TICKETS_STATE?.OVERDUES
                                  ? theme.palette.error?.main
                                  : theme?.palette?.text?.primary,
                            }}
                          >
                            {invoiceAmount({
                              status: item?._id,
                              amount: item?.totalNetAmount,
                            })}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  },
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xl={6}
              xs={12}
              sx={{
                background:
                  'linear-gradient(236.18deg, #EBFAF8 -12.81%, rgba(235, 250, 248, 0) 104.87%)',
              }}
            >
              <ReactApexChart
                options={options}
                series={options?.series}
                type="donut"
                height={290}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default InvoicingCard;
